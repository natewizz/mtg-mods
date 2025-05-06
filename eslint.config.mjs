import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore generated Prisma client files
  { ignores: ["src/generated/prisma/**", "node_modules/.prisma/client/**"] }, 
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Override rules for specific files
  {
    files: ["src/auth.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-implicit-any-catch": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    }
  }
];

export default eslintConfig;
