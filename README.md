## README.md: Sistem Absensi Karyawan (Letify ID Test)

**Production URL:**

```
https://web-employee-attendance-system.vercel.app/
```

### Deskripsi Proyek

Proyek ini adalah sistem absensi karyawan untuk perusahaan multinasional dengan >50 karyawan dan berbagai departemen. Sistem ini mencatat absensi, mengevaluasi kedisiplinan (ketepatan waktu berdasarkan batas waktu per departemen), dan mengelola data karyawan serta departemen. Dibangun dengan:

- **Back-end**: Golang (Fiber framework) dengan database (asumsi PostgreSQL berdasarkan UUID dan relasi di ERD).
- **Front-end**: TypeScript dengan pola modular (layered architecture) untuk API calls, validation menggunakan Zod, dan authentication via NextAuth v5 (Auth.js beta).

Proyek ini memenuhi requirement test lamaran kerja dari Letify ID, termasuk ERD (relasi User-Profile-Department-Attendance) dan Flowchart (flow signup/signin, CRUD, absensi, dan reporting).

### Arsitektur Front-End

Front-end menggunakan pola **layered architecture** untuk memisahkan concerns, membuat kode mudah di-maintain dan testable. Setiap module (auth, user, department, attendance) memiliki layer yang sama:

1. **Validation Layer (Zod)**:

   - File: `module-validation.ts` (misalnya `auth-validation.ts`).
   - Fungsi: Mendefinisikan schema input/output menggunakan Zod untuk validasi data (e.g., email, password, UUID).
   - Contoh: `SignupRequestSchema = z.object({ email: z.string().email(), ... })`.
   - Manfaat: Mencegah data invalid masuk ke service, handle error dengan `safeParse` dan `handleZodError`.

2. **Service Layer (Fetch API)**:

   - File: `module-service.ts`.
   - Fungsi: Melakukan HTTP request ke back-end API menggunakan `apiFetch` (asumsi helper fetch custom dengan error handling).
   - Contoh: `signUpRest(payload)` yang call `POST /auth/signup` dengan headers (e.g., Authorization token) dan body.
   - Manfaat: Isolasi logic network, handle try-catch untuk ZodError atau server error, return `APIResponse` standardized (status, message, payload).

3. **Interface Layer**:

   - File: `module-interface.ts`.
   - Fungsi: Mendefinisikan kontrak method untuk controller (e.g., `AuthInterface { signUp: (data) => Promise<APIResponse> }`).
   - Manfaat: Memungkinkan switching implementasi (e.g., REST vs Supabase) tanpa ubah code caller.

4. **Controller Layer**:

   - File: `module-controller.ts`.
   - Fungsi: Mengimplementasikan interface, validasi input dengan Zod, lalu call service. Factory function `newModuleController()` untuk inisialisasi (e.g., pilih REST atau alternatif).
   - Contoh: `RestAuthController implements AuthInterface { async signUp(data) { parsed = safeParse; return signUpRest(parsed); } }`.
   - Manfaat: Business logic sederhana, handle validation error sebelum network call.

5. **Action Layer**:
   - File: `module-action.ts`.
   - Fungsi: Wrapper sederhana untuk call controller, digunakan di UI/components (e.g., `signUpAction(data) { return newAuthController().signUp(data); }`).
   - Manfaat: Entry point untuk UI, mudah di-import dan digunakan di hooks atau pages.

**Struktur Folder Keseluruhan**:

```
src/
├── api/                # Helper fetch (apiFetch, handleZodError, etc.)
├── modules/
│   ├── auth/
│   │   ├── auth-validation.ts
│   │   ├── auth-service.ts
│   │   ├── auth-interface.ts
│   │   ├── auth-controller.ts
│   │   └── auth-action.ts
│   ├── user/           # Serupa untuk user (list, update profile, get profile)
│   ├── department/     # Serupa untuk CRUD department + assignment
│   └── attendance/     # Serupa untuk clock in/out, logs, history, dashboard, current status
├── utils/              # APIResponse type, handleZodError, etc.
└── ...                 # Pages, components, etc.
```

- **APIResponse Type**: Standardized response { status: 'success'|'error', status_code, message, payload: { data, errors } }.
- **Dependencies**: Zod untuk validation, fetch API native atau Axios untuk service.

Ini mirip clean architecture: Validation & Interface sebagai boundary, Service sebagai adapter, Controller sebagai use case, Action sebagai presenter.

### Handling Authentication dengan NextAuth (Auth.js v5 Beta)

Authentication di-handle menggunakan **NextAuth v5 (sekarang disebut Auth.js)**, versi beta terbaru (pada September 2025, ini adalah v5.x dengan fitur seperti adapter custom, credential provider, dan JWT/session management yang lebih fleksibel).

**Penjelasan Implementasi**:

- **Provider**: Menggunakan Credentials provider untuk email/password (signin/signup), JWT untuk session, dan refresh token mechanism.
- **Konfigurasi** (di `auth.ts` atau `[...nextauth].ts`):

  ```typescript
  import { AuthOptions } from "next-auth";
  import CredentialsProvider from "next-auth/providers/credentials";
  import { signInAction } from "@/modules/auth/auth-action"; // Dari action layer

  export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: { email: {}, password: {} },
        async authorize(credentials) {
          const res = await signInAction(
            { email: credentials.email, password: credentials.password },
            "device-id-here"
          );
          if (res.status === "success") {
            return {
              ...res.payload.data.user,
              accessToken: res.payload.data.access_token,
            };
          }
          return null;
        },
      }),
    ],
    session: { strategy: "jwt" }, // Gunakan JWT untuk session
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.accessToken;
          token.user = user;
        }
        // Handle refresh token jika expired (call refreshTokenAction)
        return token;
      },
      async session({ session, token }) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        return session;
      },
    },
    pages: { signIn: "/login" }, // Custom login page
  };
  ```

- **Usage di Front-End**:
  - Gunakan `useSession()` dari `next-auth/react` untuk cek session.
  - Untuk protected routes: Gunakan middleware atau `getServerSession` di server-side.
  - Token disimpan di JWT, refresh via `refreshTokenAction` jika expired.
  - Integrasi dengan module auth: Call `signInAction`, `signOutAction`, dll., dari action layer.

Ini aman, scalable, dan mendukung role-based access (e.g., admin only untuk CRUD).

### Cara Menjalankan Aplikasi Front-End

Asumsi: Next.js app. Pastikan back-end Golang berjalan di `localhost:3000` atau env var.

1. **Prerequisites**:

   - Node.js v18+.
   - Yarn atau npm.
   - Back-end Golang running (go run main.go).

2. **Instalasi**:

   ```
   git clone [your-repo-url]
   cd frontend
   npm install  # atau yarn install
   # Dependencies: zod, next-auth@beta, etc.
   ```

3. **Konfigurasi Env**:
   Buat `.env.local`:

   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=420b7a99ab9ab44b1bf27564aca86246
   API_BASE_URL=http://localhost:3000  # Back-end URL
   ```

4. **Run Development**:

   ```
   npm run dev  # Jalankan di http://localhost:3001
   ```

5. **Build & Production**:

   ```
   npm run build
   npm start
   ```

6. **Testing**:
   - Unit test: Jest untuk validation & controller.
   - E2E: Cypress untuk flow absensi.

### Pemenuhan Requirement Test Lamaran Kerja Letify ID

Berdasarkan spesifikasi (ERD: relasi User-Department-Attendance; Flowchart: flow auth-CRUD-absensi-report), implementasi kita **sepenuhnya memenuhi**:

- **CRUD Karyawan**: Module user (listUsers, updateProfile, getProfile). Admin only untuk list.
- **CRUD Departemen**: Module department (create, get, update, delete, getDepartments, assignDepartment). Admin only.
- **POST Absen Masuk**: Attendance clockIn (POST /attendance/clock-in).
- **PUT Absen Keluar**: Attendance clockOut (PUT /attendance/clock-out).
- **GET List Log Absensi**: Attendance getAttendanceLogs dengan filter date & department_id. Evaluasi ketepatan (in_punctuality: "On Time"/"Late"; out_punctuality: "On Time"/"Early Leave") berdasarkan max_clock_in/out per departemen.
- **Tambahan dari Update**: History, dashboard admin, current status – memperkaya sistem.
