import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { cookies } from "next/headers";

export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookieStore = cookies();
    // Verificar se o refreshToken está presente nos cookies e é um JSON válido
    const refreshTokenCookie = (await cookieStore).get("refreshToken");
    if (refreshTokenCookie) {
      refreshToken = JSON.parse(refreshTokenCookie.value);
    }
  } catch (e) {
    console.error("Erro ao ler o refresh token:", e);
  }

  // Certifique-se de que o NEXT_PUBLIC_WIX_CLIENT_ID está presente no ambiente
  const wixClient = createClient({
    modules: {
      products,
      collections,
      // CorrentCart se necessário
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!, // Verifique se esta variável de ambiente está configurada corretamente
      tokens: {
        refreshToken,
        accessToken: {
          value: "", // Talvez você precise definir ou recuperar o accessToken também
          expiresAt: 0,
        },
      },
    }),
  });

  return wixClient;
};
