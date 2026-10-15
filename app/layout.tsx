import type {Metadata} from 'next';
import {Lexend, Space_Grotesk} from 'next/font/google';
import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EscSimulados - Plataforma de Simulados ENEM, Vestibulares e Concursos',
  description: 'Plataforma completa de simulados online para ENEM, Vestibulares (FUVEST, UNICAMP), Concursos Públicos e Ensino Fundamental e Médio com cronômetro oficial e gabarito comentado.',
  openGraph: {
    title: 'EscSimulados - Simulados Oficiais e Gabaritos Comentados',
    description: 'Treine com simulados no padrão oficial do ENEM e principais bancas de concursos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EscSimulados - Treinamento Inteligente para Provas',
    description: 'Simulados de alto padrão para ENEM, Vestibulares e Concursos Públicos.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#F8F9FA] text-[#212529] antialiased selection:bg-[#E8F5E9] selection:text-[#15803D]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
