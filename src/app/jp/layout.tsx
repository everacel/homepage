import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "信頼性と効率性の高い国際フレートフォワーダとサプライチェーンソリューション - お客様のビジネスを支援",
  description:
    "当社は、効率的で信頼性の高い国際的な貨物輸送とサプライチェーンソリューションを提供し、お客様のビジネスの成功をサポートします。我々はお客様の物流と調達のニーズに深く対応し、ビジネスの成長を確実にします。あなたのビジネスは我々のビジネスです。",
  keywords: [
    "国際フレートフォワーダ",
    "サプライチェーンソリューション",
    "物流サービス",
    "調達代行",
    "物流最適化",
    "サプライチェーン管理",
    "輸出入のサポート",
    "積極的なカスタマーサポート",
    "国際貿易ガイダンス",
    "ドアツードア物流",
    "カスタムフレートソリューション",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
