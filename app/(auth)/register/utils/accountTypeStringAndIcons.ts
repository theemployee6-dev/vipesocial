import { HouseIcon, UserIcon, VideoCameraIcon } from "@phosphor-icons/react";

export const accountTypeStringAndIcons = [
  {
    value: "pessoal",
    label: "Pessoal",
    desc: "Uso próprio",
    Icon: UserIcon,
  },
  {
    value: "criador",
    label: "Criador",
    desc: "Produtor de conteúdo",
    Icon: VideoCameraIcon,
  },
  {
    value: "marca",
    label: "Marca",
    desc: "Empresa / negócio",
    Icon: HouseIcon,
  },
];
