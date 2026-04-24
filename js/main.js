/**
 * 阿里公安网站 - 主要脚本
 */

// 高清图片加载器
(function() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    var dpr = window.devicePixelRatio || 1;
    // 确定图片后缀
    var suffix = '';
    if (screenWidth >= 2560) {
        suffix = '@3x';
    } else if (screenWidth >= 1080 || dpr >= 2) {
        suffix = '@2x';
    }

    // 保存到全局变量
    window.HD_IMAGE_SUFFIX = suffix;

    console.log('[HD Images] 屏幕宽度: ' + screenWidth + ', DPR: ' + dpr + ', 后缀: ' + (suffix || '1x'));

    // 如果需要高清图片，替换图片路径
    if (suffix) {
        document.addEventListener('DOMContentLoaded', function() {
            var images = document.querySelectorAll('img[data-hd]');
            var replacedCount = 0;

            images.forEach(function(img) {
                var src = img.getAttribute('src');
                if (src && !src.includes(suffix)) {
                    // 构建高清图片路径
                    var hdSrc = src.replace(/\.png$/, suffix + '.png')
                                   .replace(/\.jpg$/, suffix + '.jpg');

                    // 预加载检查
                    var testImg = new Image();
                    testImg.onload = function() {
                        img.src = hdSrc;
                        replacedCount++;
                        console.log('[HD Images] 已替换: ' + hdSrc);
                    };
                    testImg.onerror = function() {
                        // 如果高清图片不存在，保持原样
                        console.log('[HD Images] 图片不存在，保持默认: ' + src);
                    };
                    testImg.src = hdSrc;
                }
            });
        });
    }
})();

// Tab 切换功能
document.addEventListener('DOMContentLoaded', function() {
    var tabItems = document.querySelectorAll('.tab-item');
    var tabPanels = document.querySelectorAll('.tab-panel');

    tabItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var tabId = this.getAttribute('data-tab');

            // 移除所有 active 类
            tabItems.forEach(function(t) { t.classList.remove('active'); });
            tabPanels.forEach(function(p) { p.classList.remove('active'); });

            // 添加 active 类到当前项
            this.classList.add('active');
            var targetPanel = document.getElementById(tabId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});

// 二维码悬浮框显示/隐藏
document.addEventListener('DOMContentLoaded', function() {
    var qrCode = document.getElementById('qrCode');
    if (qrCode) {
        // 可以添加滚动显示逻辑
        var lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // 滚动超过 100px 显示二维码
            if (scrollTop > 100) {
                qrCode.style.opacity = '1';
            } else {
                qrCode.style.opacity = '0.8';
            }
            lastScrollTop = scrollTop;
        });
    }
});

console.log('阿里公安网站脚本已加载');
