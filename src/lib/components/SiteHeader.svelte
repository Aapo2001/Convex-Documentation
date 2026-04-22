<script>
  import { page } from '$app/state';

  const links = [
    { href: '/', label: 'Hub' },
    { href: '/docs', label: 'Docs' }
  ];

  function isActive(pathname, href) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }
</script>

<header class="site-header">
  <div class="site-header__inner">
    <a class="brand-lockup" href="/" aria-label="Convex documentation home">
      <img class="brand-mark" src="/brand/quickhabit-logo.svg" alt="" />
      <span class="brand-copy">
        <span class="eyebrow">QuickHabit</span>
        <span class="brand-title">Convex Documentation</span>
      </span>
    </a>

    <nav class="header-nav" aria-label="Primary">
      {#each links as link}
        <a
          class:is-active={isActive(page.url.pathname, link.href)}
          class="nav-link"
          href={link.href}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <a class="header-cta" href="/docs">Browse Documentation</a>
  </div>
</header>
