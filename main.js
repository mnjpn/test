document.addEventListener('DOMContentLoaded', () => {

    // ページロード時のHeroセクションアニメーショントリガー
    setTimeout(() => {
        document.querySelector('.hero-section').classList.add('loaded');
        const heroElements = document.querySelectorAll('#hero .fade-up');
        heroElements.forEach(el => el.classList.add('in-view'));
    }, 100);

    // ナビゲーションバーのスクロール連動
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    let heroHeight = heroSection.offsetHeight;

    window.addEventListener('resize', () => {
        heroHeight = heroSection.offsetHeight;
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // スクロール時に要素を出現させるIntersection Observer
    const animateElements = document.querySelectorAll('.fade-up, .fade-in, .image-showcase');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // 画面の下から15%入ったところで発火
        threshold: 0
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // 一度表示されたら監視を解除（再度スクロールしてもアニメーションさせない場合）
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        elementObserver.observe(el);
    });

    // パララックス（視差）効果のシンプルな実装
    const parallaxImages = document.querySelectorAll('.parallax-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxImages.forEach(img => {
            const speed = 0.15;
            const yPos = -(scrolled * speed);
            // 画像の位置を調整
            img.style.transform = `translateY(${yPos}px) scale(1.15)`;
        });
    });

});
