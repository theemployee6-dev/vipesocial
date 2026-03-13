// export interface UploadFileOptions {
//   bucket: string;
//   path: string;
//   file: File | Buffer;
//   cacheControl?: string;
//   upsert?: boolean;
// }

// export interface IStorageService {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   uploadFile(options: UploadFileOptions): Promise<{ error?: any }>;
//   getPublicUrl(bucket: string, path: string): string;
// }

export interface UploadFileOptions {
  bucket: string;
  path: string;
  file: File | Buffer;
  cacheControl?: string;
  upsert?: boolean;
}

export interface IStorageService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadFile(options: UploadFileOptions): Promise<{ error?: any }>;
  getPublicUrl(bucket: string, path: string): string;
  getSignedUrl(
    bucket: string,
    path: string,
    expiresIn?: number,
  ): Promise<string | null>;
}
