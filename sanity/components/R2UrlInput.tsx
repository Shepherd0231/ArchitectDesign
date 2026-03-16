import React, { useRef, useState } from 'react';
import { Button, Card, Inline, Stack, Text, TextInput } from '@sanity/ui';
import { set, unset } from 'sanity';
import type { StringInputProps } from 'sanity';

type UploadResponse =
  | { success: true; url: string; publicUrl?: string; key?: string }
  | { success: false; error?: string; message?: string; missing?: string[] };

export function R2UrlInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;

  const endpoint = ((import.meta.env.SANITY_STUDIO_R2_UPLOAD_URL as string | undefined) ?? '')
    .trim()
    .replace(/\/+$/g, '');
  const token = ((import.meta.env.SANITY_STUDIO_R2_UPLOAD_TOKEN as string | undefined) ?? '').trim();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const setValue = (next: string) => {
    const v = next.trim();
    onChange(v ? set(v) : unset());
  };

  const upload = async (file: File) => {
    setErr(null);
    if (!endpoint) {
      setErr('Missing SANITY_STUDIO_R2_UPLOAD_URL');
      return;
    }

    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });
      const data = (await res.json().catch(() => null)) as UploadResponse | null;

      if (!res.ok || !data) {
        setErr(`Upload failed (${res.status})`);
        return;
      }
      if ('success' in data && data.success) {
        setValue(data.url);
        return;
      }

      const msg =
        (data as any)?.message || (data as any)?.error || `Upload failed (${res.status})`;

      setErr(String(msg));
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <Stack space={2}>
      <TextInput
        value={typeof value === 'string' ? value : ''}
        readOnly={readOnly}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="r2://images/xxx.jpg or https://img.376543.xyz/images/xxx.jpg"
      />

      <Inline space={2}>
        <Button
          text={busy ? 'Uploading…' : 'Upload to R2'}
          mode="default"
          tone="primary"
          disabled={readOnly || busy}
          onClick={() => fileRef.current?.click()}
        />
        <Button
          text="Clear"
          mode="ghost"
          tone="default"
          disabled={readOnly || busy}
          onClick={() => onChange(unset())}
        />
      </Inline>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file) void upload(file);
        }}
      />

      {!endpoint ? (
        <Card padding={2} tone="caution">
          <Text size={1}>SANITY_STUDIO_R2_UPLOAD_URL 未配置</Text>
        </Card>
      ) : null}

      {err ? (
        <Card padding={2} tone="critical">
          <Text size={1}>{err}</Text>
        </Card>
      ) : null}
    </Stack>
  );
}
