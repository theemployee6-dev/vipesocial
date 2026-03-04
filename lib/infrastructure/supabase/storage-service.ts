import { supabase } from "./supbabase-client";
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
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl, upsert });
    return { error };
  }

  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
