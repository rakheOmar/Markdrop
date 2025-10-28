import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default function handler(request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'Markdrop';

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
                        backgroundColor: '#ffffff',
                        backgroundImage: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 80,
                                fontWeight: 'bold',
                                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: 0,
                                padding: 0,
                                textAlign: 'center',
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                fontSize: 32,
                                color: '#64748b',
                                marginTop: 20,
                                textAlign: 'center',
                            }}
                        >
                            Visual Markdown Editor & Builder
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                marginTop: 40,
                                gap: 20,
                            }}
                        >
                            <div
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    borderRadius: 8,
                                    fontSize: 20,
                                }}
                            >
                                Drag & Drop
                            </div>
                            <div
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#8b5cf6',
                                    color: 'white',
                                    borderRadius: 8,
                                    fontSize: 20,
                                }}
                            >
                                Live Preview
                            </div>
                            <div
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#06b6d4',
                                    color: 'white',
                                    borderRadius: 8,
                                    fontSize: 20,
                                }}
                            >
                                Export
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
