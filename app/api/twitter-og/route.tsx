import { ImageResponse } from 'next/og';

const OG_PATH =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/og.png'
    : 'https://finance-tracker.darshans.site/og.png';

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}
    >
      <img
        src={OG_PATH}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>,
    {
      width: 1200,
      height: 628
    }
  );
}
