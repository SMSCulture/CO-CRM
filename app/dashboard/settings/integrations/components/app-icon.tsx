import Image from "next/image";
interface AppIconProps { logo: string; size?: "sm" | "md" | "lg" | "xl" }
const SIZE_CLASSES = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-16 w-16", xl: "h-24 w-24" };
const ICON_SIZES = { sm: 22, md: 28, lg: 38, xl: 56 };
const BRAND_COLORS:Record<string,string>={meta:"bg-[#0866ff]",youtube:"bg-[#ff0033]",spotify:"bg-[#1ed760]",hubspot:"bg-[#ff5c35]",salesforce:"bg-[#0d9dda]",mailchimp:"bg-[#ffe01b]",klaviyo:"bg-black",calendar:"bg-white"};
export function AppIcon({ logo, size = "md" }: AppIconProps) {return <div className={`flex shrink-0 items-center justify-center rounded-xl border ${BRAND_COLORS[logo]??'bg-white'} ${SIZE_CLASSES[size]}`}><Image src={`/integration-logos/${logo}.${logo === "klaviyo" ? "png" : "svg"}`} alt={`${logo} logo`} width={ICON_SIZES[size]} height={ICON_SIZES[size]} className={`${['mailchimp','calendar','spotify'].includes(logo)?'':'invert'} object-contain`}/></div>}
