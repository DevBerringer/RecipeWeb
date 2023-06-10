interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  return (
    <a
      className="px-3 py-2 flex items-center text-xl font-bold leading-snug text-black hover:opacity-75"
      href={href}
    >
      <div className="my-auto align-self-middle align-middle right-0 mr-0 text-black">
        {text}
      </div>
    </a>
  );
}
export default NavItem;
