export function getOrCreateDeviceId() {
  if (typeof window === "undefined") return "";

  const key = "device_id";
  let deviceId = localStorage.getItem(key);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(key, deviceId);

    // juga simpan di cookie untuk akses di server
    document.cookie = `device_id=${deviceId}; path=/; max-age=31536000`;
  }
  return deviceId;
}
