export type User = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  comments: string;
};

const firstNames = ["Andi", "Budi", "Citra", "Dewi", "Eka", "Fajar", "Gita"];
const lastNames = [
  "Santoso",
  "Wijaya",
  "Putri",
  "Saputra",
  "Kurniawan",
  "Lestari",
];
const domains = ["example.com", "mail.com", "test.org", "dummy.net"];
const sampleComments = [
  "Sangat puas dengan layanan ini.",
  "Perlu perbaikan di beberapa bagian.",
  "Pengalaman yang menyenangkan.",
  "Akan merekomendasikan ke teman.",
  "Kurang responsif saat dihubungi.",
  "Tim support sangat membantu.",
];

const getRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomAge = () => Math.floor(Math.random() * (90 - 18 + 1)) + 18;
const getRandomEmail = (first: string, last: string) =>
  `${first.toLowerCase()}.${last.toLowerCase()}@${getRandom(domains)}`;
const getRandomComments = () =>
  Array.from({ length: 3 }, () => getRandom(sampleComments)).join(" ");

export const createUser = (numUser: number): User[] => {
  console.log("createUser");
  const users: User[] = [];

  for (let i = 0; i < numUser; i++) {
    const firstName = getRandom(firstNames);
    const lastName = getRandom(lastNames);
    users.push({
      firstName,
      lastName,
      age: getRandomAge(),
      email: getRandomEmail(firstName, lastName),
      comments: getRandomComments(),
    });
  }

  return users;
};
