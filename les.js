document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.scrolling-bar-wrapper');
    const items = document.querySelectorAll('.scrolling-bar-item');

    if (!wrapper || items.length === 0) {
        console.warn('Scrolling bar wrapper or items not found. Skipping script execution.');
        return;
    }

    // 元のアイテムを複製してループを作成（最低でも2セット分）
    // これにより、スクロールが途切れることなくループしているように見えます
    const totalItems = items.length;
    for (let i = 0; i < totalItems; i++) {
        const clone = items[i].cloneNode(true);
        wrapper.appendChild(clone);
    }
    // 完全にスムーズなループのためにもう一度複製することを推奨する場合も
    // for (let i = 0; i < totalItems; i++) {
    //     const clone = items[i].cloneNode(true);
    //     wrapper.appendChild(clone);
    // }

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // ピクセル/フレーム - スクロール速度を調整できます

    function autoScroll() {
        scrollPosition += scrollSpeed;
        // wrapperのコンテンツの半分（元のアイテムセットの終わり）までスクロールしたらリセット
        // これにより、ユーザーには途切れることなくループしているように見える
        const wrapperHalfWidth = wrapper.scrollWidth / 2;
        if (scrollPosition >= wrapperHalfWidth) {
            scrollPosition = 0; // スクロール位置をリセット
        }
        wrapper.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(autoScroll);
    }

    // スクロールを開始
    autoScroll();

    // オプション：マウスオーバーでスクロールを一時停止させる機能
    let animationFrameId; // requestAnimationFrameのIDを保持
    const startScroll = () => {
        if (!animationFrameId) { // アニメーションが既に実行中でなければ開始
            autoScroll();
        }
    };
    const stopScroll = () => {
        cancelAnimationFrame(animationFrameId); // 現在のアニメーションフレームをキャンセル
        animationFrameId = null; // IDをリセット
    };

    wrapper.addEventListener('mouseenter', stopScroll);
    wrapper.addEventListener('mouseleave', startScroll);

    // ウィンドウリサイズ時の処理 (CSSのflexboxとメディアクエリで大部分は対応済みですが、
    // JavaScriptでより厳密な調整が必要な場合のために残しています。
    // 今回の実装ではこの部分での追加処理は不要かもしれません。)
    window.addEventListener('resize', () => {
        // 例: 画面幅に応じてスクロール速度やアイテムの表示幅を再計算するロジック
    });
});