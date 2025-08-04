import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'MTG Mods';
  const description = searchParams.get('description') || 'Magic: The Gathering Rule Variants & Community';
  const type = searchParams.get('type') || 'default';

  // Define colors based on your brand
  const colors = {
    primary: '#5A31F4',
    accent: '#3DA1C4',
    dark: '#2C2E3A',
    light: '#F1F3FA',
    white: '#FFFFFF',
  };

  // Create different layouts based on type
  let bgColor = colors.primary;
  const textColor = colors.white;

  switch (type) {
    case 'recipe':
      bgColor = colors.accent;
      break;
    case 'profile':
      bgColor = colors.dark;
      break;
    case 'learn':
      bgColor = colors.primary;
      break;
    default:
      bgColor = colors.primary;
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor,
          backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.accent}20 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${colors.primary}20 0%, transparent 50%)`,
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3,
          }}
        />

        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: textColor,
              marginRight: '16px',
            }}
          >
            🃏
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: textColor,
              letterSpacing: '2px',
            }}
          >
            MTG MODS
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: textColor,
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '32px',
            color: textColor,
            textAlign: 'center',
            opacity: 0.9,
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '60px',
            right: '60px',
            height: '4px',
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary})`,
            borderRadius: '2px',
          }}
        />

        {/* Type indicator */}
        {type !== 'default' && (
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '60px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: textColor,
              opacity: 0.7,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {type}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 