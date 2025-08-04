import React from 'react';

export function FontFallbackDemo() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Font Fallback Chain Demo</h2>
        
        {/* Roboto Primary Example */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Roboto Primary (Your Example)</h3>
            <div className="bg-muted p-4 rounded">
              <span className="font-roboto text-lg">
                "田中明 (Akira Tanaka)"
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Expected behavior:</strong>
                <br />• "田中明" → Roboto (fails) → ui-sans-serif (fails) → ... → Noto Sans JP ✅
                <br />• "(Akira Tanaka)" → Roboto ✅ (stops here)
              </p>
            </div>
          </div>

          {/* Mixed Content Example */}
          <div>
            <h3 className="text-lg font-medium mb-2">2. Mixed Content Font</h3>
            <div className="bg-muted p-4 rounded">
              <span className="font-mixed text-lg">
                "進撃の巨人 (Attack on Titan) - 最終シーズン"
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Fallback chain:</strong> Roboto → ui-sans-serif → system-ui → ... → Noto Sans JP
              </p>
            </div>
          </div>

          {/* Japanese Priority Example */}
          <div>
            <h3 className="text-lg font-medium mb-2">3. Japanese Priority Font</h3>
            <div className="bg-muted p-4 rounded">
              <span className="font-jp-priority text-lg">
                "ワンピース One Piece エピソード1000"
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Fallback chain:</strong> Noto Sans JP → Hiragino Sans → ... → Roboto → ui-sans-serif
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h3 className="text-lg font-medium mb-2">4. Font Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded">
                <h4 className="font-medium mb-2">Same Content, Different Fonts</h4>
                <div className="space-y-2">
                  <div className="font-roboto">
                    <span className="text-sm text-muted-foreground">font-roboto:</span> "鬼滅の刃 Demon Slayer"
                  </div>
                  <div className="font-poppins">
                    <span className="text-sm text-muted-foreground">font-poppins:</span> "鬼滅の刃 Demon Slayer"
                  </div>
                  <div className="font-inter">
                    <span className="text-sm text-muted-foreground">font-inter:</span> "鬼滅の刃 Demon Slayer"
                  </div>
                  <div className="font-jp-priority">
                    <span className="text-sm text-muted-foreground">font-jp-priority:</span> "鬼滅の刃 Demon Slayer"
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded">
                <h4 className="font-medium mb-2">Author Names</h4>
                <div className="space-y-2">
                  <div className="font-roboto">
                    <span className="text-sm text-muted-foreground">font-roboto:</span> "田中明 (Akira Tanaka)"
                  </div>
                  <div className="font-mixed">
                    <span className="text-sm text-muted-foreground">font-mixed:</span> "佐藤雪 (Yuki Sato)"
                  </div>
                  <div className="font-jp-priority">
                    <span className="text-sm text-muted-foreground">font-jp-priority:</span> "山田寛 (Hiroshi Yamada)"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Explanation */}
      <div className="bg-card p-6 rounded-lg border">
        <h3 className="text-lg font-medium mb-4">How Browser Handles Per-Character Fallback</h3>
        <div className="space-y-4 text-sm">
          <div className="bg-muted p-4 rounded">
            <p className="font-mono text-xs mb-2">
              font-family: "Roboto", ui-sans-serif, system-ui, -apple-system, ..., "Noto Sans JP", sans-serif;
            </p>
            <div className="space-y-1">
              <p><strong>Step 1:</strong> Browser tries "Roboto" for each character</p>
              <p><strong>Step 2:</strong> If character not supported, tries "ui-sans-serif"</p>
              <p><strong>Step 3:</strong> Continues down the chain until character is found</p>
              <p><strong>Step 4:</strong> Different characters in same string can use different fonts</p>
            </div>
          </div>
          
          <div className="bg-primary/10 p-4 rounded border-l-4 border-primary">
            <p className="font-medium">Key Insight:</p>
            <p>Font fallback happens <strong>per-character</strong>, not per-element! This allows seamless mixing of Latin and Japanese characters with optimal fonts for each.</p>
          </div>
        </div>
      </div>
    </div>
  );
}