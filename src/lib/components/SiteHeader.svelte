<script>
  import { base } from '$app/paths';
  import { page } from '$app/state';

  const links = [
    { href: base || '/', label: 'Hub' },
    { href: `${base}/docs`, label: 'Docs' }
  ];

  function isActive(pathname, href) {
    if (href === (base || '/')) {
      return pathname === href || pathname === `${href}/`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }
</script>

<header class="site-header">
  <div class="site-header__inner">
    <a class="brand-lockup" href={base || '/'} aria-label="Convex documentation home">
      <img class="brand-mark" src={`${base}/brand/quickhabit-logo.svg`} alt="" />
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

    <a class="header-cta" href={`${base}/docs`}>Browse Documentation</a>
  </div>
</header>
