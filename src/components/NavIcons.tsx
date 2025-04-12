"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CardModal from "./CardModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  // Função para lidar com o clique no ícone de perfil
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    try {
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      setIsLoading(false);
      setIsProfileOpen(false);
      router.push(logoutUrl); // Redireciona para o URL de logout
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="Ícone de perfil"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />

      {/* Menu de perfil */}
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/" className="block py-1">Perfil</Link>
          <div
            className="mt-2 cursor-pointer"
            onClick={handleLogout}
          >
            {isLoading ? (
              <span>Logging out...</span> // Exibir mensagem de logout
            ) : (
              "Sair"
            )}
          </div>
        </div>
      )}

      {/* Ícone de notificação */}
      <Image
        src="/notification.png"
        alt="Ícone de notificações"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      {/* Ícone de carrinho */}
      <div className="relative cursor-pointer" onClick={() => setIsCartOpen((prev) => !prev)}>
        <Image
          src="/cart.png"
          alt="Ícone de carrinho"
          width={22}
          height={22}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">1</div>
      </div>

      {isCartOpen && <CardModal />}
    </div>
  );
};

export default NavIcons;
