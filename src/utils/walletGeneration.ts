import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { Buffer } from 'buffer';

// Initialize BIP32 with tiny-secp256k1
const bip32 = BIP32Factory(ecc);

export interface GeneratedWallet {
  address: string;
  privateKey: string;
  publicKey: string;
  mnemonic: string;
  chain: string;
  type?: string;
}

export interface WalletCreationResult {
  wallets: GeneratedWallet[];
  mnemonic: string;
}

export const generateMnemonic = (): string => {
  return bip39.generateMnemonic();
};

export const generateEthereumWallet = (mnemonic: string): GeneratedWallet => {
  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    mnemonic,
    chain: 'Ethereum'
  };
};

export const generateSolanaWallet = (mnemonic: string): GeneratedWallet => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const keypair = Keypair.fromSeed(seed.slice(0, 32));
  
  return {
    address: keypair.publicKey.toString(),
    privateKey: Buffer.from(keypair.secretKey).toString('hex'),
    publicKey: keypair.publicKey.toString(),
    mnemonic,
    chain: 'Solana'
  };
};

export const generateBitcoinWallet = (mnemonic: string, type: 'taproot' | 'segwit' = 'segwit'): GeneratedWallet => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);
  
  let path: string;
  let addressType: string;
  
  if (type === 'taproot') {
    path = "m/86'/0'/0'/0/0"; // BIP86 for Taproot
    addressType = 'Taproot';
  } else {
    path = "m/84'/0'/0'/0/0"; // BIP84 for Native SegWit
    addressType = 'Native Segwit';
  }
  
  const child = root.derivePath(path);
  const privateKey = child.privateKey;
  const publicKey = child.publicKey;
  
  let address: string;
  
  if (type === 'taproot' && publicKey) {
    // Generate Taproot address (P2TR)
    const internalKey = Buffer.from(publicKey).slice(1, 33); // Remove first byte for taproot
    const { address: taprootAddress } = bitcoin.payments.p2tr({
      internalPubkey: internalKey,
      network: bitcoin.networks.bitcoin
    });
    address = taprootAddress!;
  } else {
    // Generate Native SegWit address (P2WPKH)
    const { address: segwitAddress } = bitcoin.payments.p2wpkh({
      pubkey: Buffer.from(publicKey!),
      network: bitcoin.networks.bitcoin
    });
    address = segwitAddress!;
  }
  
  return {
    address,
    privateKey: privateKey ? Buffer.from(privateKey).toString('hex') : '',
    publicKey: publicKey ? Buffer.from(publicKey).toString('hex') : '',
    mnemonic,
    chain: 'Bitcoin',
    type: addressType
  };
};

export const generateAllWallets = (): WalletCreationResult => {
  const mnemonic = generateMnemonic();
  
  const wallets: GeneratedWallet[] = [
    generateEthereumWallet(mnemonic),
    generateSolanaWallet(mnemonic),
    generateBitcoinWallet(mnemonic, 'segwit'),
    generateBitcoinWallet(mnemonic, 'taproot')
  ];
  
  return {
    wallets,
    mnemonic
  };
};

export const validateMnemonic = (mnemonic: string): boolean => {
  return bip39.validateMnemonic(mnemonic);
};