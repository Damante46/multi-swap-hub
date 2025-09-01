import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { Buffer } from 'buffer';

// Make Buffer available globally
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = Buffer;
}

// Initialize BIP32 with tiny-secp256k1 with error handling
let bip32: any;
try {
  bip32 = BIP32Factory(ecc);
  console.log('BIP32 initialized successfully');
} catch (error) {
  console.error('BIP32 initialization failed:', error);
  throw new Error('Failed to initialize BIP32 factory');
}

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
  try {
    console.log('Generating mnemonic...');
    const mnemonic = bip39.generateMnemonic();
    console.log('Mnemonic generated successfully');
    return mnemonic;
  } catch (error) {
    console.error('Failed to generate mnemonic:', error);
    throw new Error(`Mnemonic generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateEthereumWallet = (mnemonic: string): GeneratedWallet => {
  try {
    console.log('Generating Ethereum wallet...');
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log('Ethereum wallet generated successfully');
    
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic,
      chain: 'Ethereum'
    };
  } catch (error) {
    console.error('Failed to generate Ethereum wallet:', error);
    throw new Error(`Ethereum wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateSolanaWallet = (mnemonic: string): GeneratedWallet => {
  try {
    console.log('Generating Solana wallet...');
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    console.log('Solana wallet generated successfully');
    
    return {
      address: keypair.publicKey.toString(),
      privateKey: Buffer.from(keypair.secretKey).toString('hex'),
      publicKey: keypair.publicKey.toString(),
      mnemonic,
      chain: 'Solana'
    };
  } catch (error) {
    console.error('Failed to generate Solana wallet:', error);
    throw new Error(`Solana wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateBitcoinWallet = (mnemonic: string, type: 'taproot' | 'segwit' = 'segwit'): GeneratedWallet => {
  try {
    console.log(`Generating Bitcoin ${type} wallet...`);
    
    if (!bip32) {
      throw new Error('BIP32 not initialized');
    }
    
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
    
    if (!privateKey || !publicKey) {
      throw new Error('Failed to derive key pair');
    }
    
    let address: string;
    
    if (type === 'taproot') {
      // Generate Taproot address (P2TR)
      const internalKey = Buffer.from(publicKey).slice(1, 33); // Remove first byte for taproot
      const { address: taprootAddress } = bitcoin.payments.p2tr({
        internalPubkey: internalKey,
        network: bitcoin.networks.bitcoin
      });
      
      if (!taprootAddress) {
        throw new Error('Failed to generate Taproot address');
      }
      address = taprootAddress;
    } else {
      // Generate Native SegWit address (P2WPKH)
      const { address: segwitAddress } = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(publicKey),
        network: bitcoin.networks.bitcoin
      });
      
      if (!segwitAddress) {
        throw new Error('Failed to generate SegWit address');
      }
      address = segwitAddress;
    }
    
    console.log(`Bitcoin ${type} wallet generated successfully`);
    
    return {
      address,
      privateKey: Buffer.from(privateKey).toString('hex'),
      publicKey: Buffer.from(publicKey).toString('hex'),
      mnemonic,
      chain: 'Bitcoin',
      type: addressType
    };
  } catch (error) {
    console.error(`Failed to generate Bitcoin ${type} wallet:`, error);
    throw new Error(`Bitcoin ${type} wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generatePolygonWallet = (mnemonic: string): GeneratedWallet => {
  try {
    console.log('Generating Polygon wallet...');
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log('Polygon wallet generated successfully');
    
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic,
      chain: 'Polygon'
    };
  } catch (error) {
    console.error('Failed to generate Polygon wallet:', error);
    throw new Error(`Polygon wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateBSCWallet = (mnemonic: string): GeneratedWallet => {
  try {
    console.log('Generating BSC wallet...');
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log('BSC wallet generated successfully');
    
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic,
      chain: 'BNB Smart Chain'
    };
  } catch (error) {
    console.error('Failed to generate BSC wallet:', error);
    throw new Error(`BSC wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateAvalancheWallet = (mnemonic: string): GeneratedWallet => {
  try {
    console.log('Generating Avalanche wallet...');
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log('Avalanche wallet generated successfully');
    
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic,
      chain: 'Avalanche'
    };
  } catch (error) {
    console.error('Failed to generate Avalanche wallet:', error);
    throw new Error(`Avalanche wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateAllWallets = (): WalletCreationResult => {
  try {
    console.log('Starting wallet generation process...');
    const mnemonic = generateMnemonic();
    
    const wallets: GeneratedWallet[] = [];
    
    // Generate each wallet type with individual error handling
    try {
      wallets.push(generateEthereumWallet(mnemonic));
    } catch (error) {
      console.error('Ethereum wallet generation failed, continuing...', error);
    }
    
    try {
      wallets.push(generatePolygonWallet(mnemonic));
    } catch (error) {
      console.error('Polygon wallet generation failed, continuing...', error);
    }
    
    try {
      wallets.push(generateBSCWallet(mnemonic));
    } catch (error) {
      console.error('BSC wallet generation failed, continuing...', error);
    }
    
    try {
      wallets.push(generateAvalancheWallet(mnemonic));
    } catch (error) {
      console.error('Avalanche wallet generation failed, continuing...', error);
    }
    
    try {
      wallets.push(generateSolanaWallet(mnemonic));
    } catch (error) {
      console.error('Solana wallet generation failed, continuing...', error);
    }
    
    try {
      wallets.push(generateBitcoinWallet(mnemonic, 'segwit'));
    } catch (error) {
      console.error('Bitcoin SegWit wallet generation failed, continuing...', error);
    }
    
    try {
      wallets.push(generateBitcoinWallet(mnemonic, 'taproot'));
    } catch (error) {
      console.error('Bitcoin Taproot wallet generation failed, continuing...', error);
    }
    
    if (wallets.length === 0) {
      throw new Error('Failed to generate any wallets');
    }
    
    console.log(`Successfully generated ${wallets.length} wallets`);
    
    return {
      wallets,
      mnemonic
    };
  } catch (error) {
    console.error('Wallet generation process failed:', error);
    throw new Error(`Wallet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const validateMnemonic = (mnemonic: string): boolean => {
  return bip39.validateMnemonic(mnemonic);
};