import dynamic from "next/dynamic";

const LottieWrapper = dynamic(() => import("react-lottie"), { ssr: false });
// or lottie-react - depending on what library you use

export default LottieWrapper;
