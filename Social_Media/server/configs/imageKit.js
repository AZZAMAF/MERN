import ImageKit from '@imagekit/nodejs';

// Pake nama variabel 'ik' atau 'imagekit' (huruf kecil) biar gak bentrok sama 'ImageKit'
const iK = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,    // WAJIB: Biar dia tau akun lu yang mana
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,  // WAJIB: Biar dia dapet ijin akses
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, // WAJIB: Biar dia tau alamat servernya
  timeout: 5000
});



export default iK