/**
 * 阿里公安网站 - 时政要闻页面脚本
 * 支持高清图片加载和分页功能
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

// 分页功能
document.addEventListener('DOMContentLoaded', function() {
    var pageNumbers = document.querySelectorAll('.page-num');
    var prevBtn = document.querySelector('.page-btn.prev');
    var nextBtn = document.querySelector('.page-btn.next');
    var currentPage = 1;
    var totalPages = 10;

    // 更新分页状态
    function updatePagination() {
        pageNumbers.forEach(function(num) {
            var page = parseInt(num.textContent);
            if (page === currentPage) {
                num.classList.add('active');
            } else {
                num.classList.remove('active');
            }
        });

        // 更新上一页/下一页按钮状态
        if (prevBtn) {
            prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
        }
        if (nextBtn) {
            nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentPage === totalPages ? 'none' : 'auto';
        }
    }

    // 页码点击事件
    pageNumbers.forEach(function(num) {
        num.addEventListener('click', function(e) {
            e.preventDefault();
            var page = parseInt(this.textContent);
            if (page !== currentPage) {
                currentPage = page;
                updatePagination();
                // 滚动到页面顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('[Pagination] 切换到第 ' + currentPage + ' 页');
            }
        });
    });

    // 上一页按钮
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('[Pagination] 切换到第 ' + currentPage + ' 页');
            }
        });
    }

    // 下一页按钮
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('[Pagination] 切换到第 ' + currentPage + ' 页');
            }
        });
    }

    // 初始化分页状态
    updatePagination();
});

// 搜索功能
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.querySelector('.search-input');
    var searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        // 搜索按钮点击事件
        searchBtn.addEventListener('click', function() {
            var keyword = searchInput.value.trim();
            if (keyword) {
                console.log('[Search] 搜索关键词: ' + keyword);
                // 这里可以添加实际的搜索逻辑
                alert('搜索: ' + keyword);
            } else {
                searchInput.focus();
            }
        });

        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
});

// 新闻项点击效果
document.addEventListener('DOMContentLoaded', function() {
    var newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // 如果点击的是链接，不阻止默认行为
            if (e.target.tagName === 'A') {
                return;
            }

            // 否则点击整个新闻项时，触发标题链接的点击
            var link = this.querySelector('.news-title a');
            if (link) {
                link.click();
            }
        });

        // 鼠标悬停效果
        item.style.cursor = 'pointer';
    });
});

// 响应式处理
document.addEventListener('DOMContentLoaded', function() {
    // 监听窗口大小变化
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var screenWidth = window.innerWidth || document.documentElement.clientWidth;
            console.log('[Responsive] 窗口大小变化，当前宽度: ' + screenWidth + 'px');

            // 根据屏幕宽度调整某些元素的显示
            if (screenWidth < 768) {
                // 移动端特殊处理
                document.body.classList.add('mobile-view');
            } else {
                document.body.classList.remove('mobile-view');
            }
        }, 250);
    });

    // 初始检查
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-view');
    }
});

console.log('阿里公安 - 时政要闻页面脚本已加载');
