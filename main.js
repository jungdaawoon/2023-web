// main.js

// ----- HTML include 로더 -----
// 각 페이지 안의 <div data-include="파일경로.html"> 를 찾아 불러옵니다.
async function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  for (const el of includes) {
    const url = el.getAttribute('data-include');
    try {
      const resp = await fetch(url, { cache: 'no-cache' });
      if (!resp.ok) throw new Error(resp.status);
      const html = await resp.text();
      el.outerHTML = html;
    } catch (e) {
      console.error('❌ include 실패:', url, e);
    }
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  
// ① include 로더 실행 (모든 partial HTML을 먼저 불러옴)
  await includeHTML();

  const body = document.body;




  // ===== 메뉴 요소 (현재 마크업 존중) =====
  const expandCheckbox = document.getElementById('expand-menu'); // 모바일 토글
  const foldingWrap    = document.querySelector('.menu-folding');   // 모바일용 컨테이너
  const unfoldingWrap  = document.querySelector('.menu-unfolding'); // 데스크탑용 컨테이너
  const menuListMobile = foldingWrap?.querySelector('ul');
  const menuListDesk   = unfoldingWrap?.querySelector('ul');

  // ===== 1) 모바일 메뉴 바깥 클릭/ESC 닫기 + 바디 스크롤 잠금 =====
  const closeMenu = () => {
    if (expandCheckbox && expandCheckbox.checked) {
      expandCheckbox.checked = false;
      body.classList.remove('nav-open');
    }
  };

  // 체크 상태 변화에 따라 body 잠금 토글
  if (expandCheckbox) {
    expandCheckbox.addEventListener('change', () => {
      body.classList.toggle('nav-open', expandCheckbox.checked);
    });
  }

  // 바깥 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!expandCheckbox || !expandCheckbox.checked) return;
    const menuArea = foldingWrap || document.body;
    if (!menuArea.contains(e.target)) closeMenu();
  });

  // ESC 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 리사이즈 시에도 상태 정리(데스크탑 전환 등)
  const BREAKPOINT = 1100; // CSS 미디어쿼리와 동일
  const onResize = () => {
    if (window.innerWidth > BREAKPOINT) {
      // 데스크탑에서는 모바일 토글 강제 닫힘
      closeMenu();
    }
  };
  window.addEventListener('resize', onResize);
  onResize();

  // ===== 2) 현재 페이지 활성 링크 표시 (모바일/데스크탑 메뉴 모두) =====
  const markActiveLinks = (scope) => {
    if (!scope) return;
    const here = location.pathname.replace(/\/+$/, '');
    scope.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      try {
        const url = new URL(href, location.origin);
        const path = url.pathname.replace(/\/+$/, '');
        if (path === here) a.classList.add('is-active');
      } catch (_) {}
    });
  };
  markActiveLinks(menuListMobile);
  markActiveLinks(menuListDesk);

  // ===== 3) (옵션) 키보드 포커스 트랩: 모바일 메뉴 펼친 동안 포커스가 메뉴 안에 머물게 =====
  if (menuListMobile && expandCheckbox) {
    menuListMobile.addEventListener('keydown', (e) => {
      if (!expandCheckbox.checked || e.key !== 'Tab') return;
      const focusables = menuListMobile.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  // ===== 4) shop 전용: 구매 링크만 새 탭 (원하면 유지) =====
  if (body.classList.contains('shop-page')) {
    document.querySelectorAll('a.buy').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }
});
