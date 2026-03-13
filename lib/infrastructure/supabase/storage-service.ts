// import { supabase } from "./supbabase-client";
// import type {
//   IStorageService,
//   UploadFileOptions,
// } from "../../core/interfaces/storage-service";

// export class SupabaseStorageService implements IStorageService {
//   async uploadFile({
//     bucket,
//     path,
//     file,
//     cacheControl = "3600",
//     upsert = false,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   }: UploadFileOptions): Promise<{ error?: any }> {
//     const { error } = await supabase.storage
//       .from(bucket)
//       .upload(path, file, { cacheControl, upsert });
//     return { error };
//   }

//   getPublicUrl(bucket: string, path: string): string {
//     const { data } = supabase.storage.from(bucket).getPublicUrl(path);
//     return data.publicUrl;
//   }
// }

import { supabaseAdmin } from "@/lib/infrastructure/supabase/admin-client";
import type {
  IStorageService,
  UploadFileOptions,
} from "../../core/interfaces/storage-service";

export class SupabaseStorageService implements IStorageService {
  async uploadFile({
    bucket,
    path,
    file,
    cacheControl = "3600",
    upsert = false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: UploadFileOptions): Promise<{ error?: any }> {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, { cacheControl, upsert });

    console.error("Detalhes do upload:", error?.message);
    return { error: error?.message };
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async getSignedUrl(
    bucket: string,
    path: string,
    expiresIn = 3600,
  ): Promise<string | null> {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) return null;
    return data.signedUrl;
  }
}
