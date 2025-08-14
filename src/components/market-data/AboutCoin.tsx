import React from 'react';
import { Card } from '@/components/ui/Card';
import { CoinId } from '@/types/market';
import { Typography, Stack } from '@mui/material';

type AboutCoinProps = {
  selectedCoin: CoinId;
  coinName: string;
};

export function AboutCoin({ selectedCoin, coinName }: AboutCoinProps) {
  const coinDescriptions: Record<CoinId, React.ReactElement> = {
    solana: (
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Solana is a high-performance blockchain supporting smart contracts and
          decentralized applications. It uses a proof-of-history consensus
          combined with proof-of-stake for high throughput.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Developed to address the scalability issues faced by earlier
          blockchains, Solana can process thousands of transactions per second
          with minimal fees, making it attractive for decentralized finance
          (DeFi) applications, non-fungible tokens (NFTs), and other blockchain
          use cases requiring high speed and low costs.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Solana's ecosystem has grown rapidly since its launch in 2020, with
          hundreds of projects building on its infrastructure. Its native
          cryptocurrency, SOL, is used for transaction fees and staking to
          secure the network.
        </Typography>
      </Stack>
    ),
    jupiter: (
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Jupiter is the leading liquidity aggregator and swap infrastructure
          for the Solana ecosystem. It provides the best swap execution through
          smart routing across various DEXs and liquidity sources.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The JUP token is the governance and utility token for Jupiter
          ecosystem, allowing holders to participate in governance decisions and
          access various features within the ecosystem.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          With its powerful infrastructure, Jupiter has become the backbone of
          Solana DeFi, processing billions in trading volume and supporting
          hundreds of integrating protocols and applications across the
          ecosystem.
        </Typography>
      </Stack>
    ),
    trump: (
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          TRUMP is a meme token created on the Solana blockchain that gained
          popularity during the 2024 election cycle. It was created as a tribute
          to the former and now re-elected US president.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Unlike many meme tokens, TRUMP has developed an active community and
          ecosystem of supporters across social media platforms, particularly on
          Twitter and Telegram.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          While initially launched as a meme token, the project has evolved to
          include staking, merchandise, and various community initiatives,
          making it one of the more recognized political-themed tokens in the
          crypto ecosystem.
        </Typography>
      </Stack>
    ),
    render: (
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Render is a distributed GPU rendering network that connects artists
          and studios needing rendering power with GPU owners willing to rent
          their hardware. The RENDER token facilitates transactions on this
          network.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The platform aims to democratize access to high-quality rendering
          capabilities by creating a decentralized network of GPUs that can be
          utilized on-demand, reducing the need for expensive in-house rendering
          farms.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          With the growing demand for 3D content creation, visual effects, and
          AI processing, Render provides an efficient solution for distributing
          computational workloads while allowing GPU owners to monetize their
          hardware when not in use.
        </Typography>
      </Stack>
    ),
    bonk: (
      <Stack spacing={2}>
        <Typography variant="body2" color="text.secondary">
          BONK is Solana's most popular meme coin, inspired by the Shiba Inu dog
          breed, similar to Dogecoin and Shiba Inu on other blockchains. It has
          become a community favorite within the Solana ecosystem.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          What distinguishes BONK from many other meme coins is its strong
          integration with the Solana ecosystem. It has been adopted by numerous
          Solana protocols and has partnerships with various projects across the
          network.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Despite starting as a meme token, BONK has developed real utility
          within the Solana ecosystem, being used for payments, tips, and as
          part of various DeFi protocols, showing how meme coins can evolve to
          provide actual value.
        </Typography>
      </Stack>
    ),
  };

  return (
    <Card title={`About ${coinName}`}>{coinDescriptions[selectedCoin]}</Card>
  );
}
