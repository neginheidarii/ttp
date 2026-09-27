const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false'
};

export const CloseIcon = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const MenuIcon = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const CheckIcon = (p) => (<svg {...base} strokeWidth={2.2} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const MinusIcon = (p) => (<svg {...base} strokeWidth={2} {...p}><path d="M6 12h12" /></svg>);
export const PlusIcon = (p) => (<svg {...base} strokeWidth={2} {...p}><path d="M12 6v12M6 12h12" /></svg>);
export const LockIcon = (p) => (<svg {...base} strokeWidth={2} {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
export const PlayIcon = (p) => (<svg {...base} {...p}><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" /></svg>);
export const PauseIcon = (p) => (<svg {...base} strokeWidth={2.6} {...p}><path d="M8.5 5.5v13M15.5 5.5v13" /></svg>);
export const InstagramIcon = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" /></svg>);
export const LinkedInIcon = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>);
export const YouTubeIcon = (p) => (<svg {...base} {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.5 9.5l4 2.5-4 2.5z" /></svg>);
