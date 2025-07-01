interface NavItemProps {
  href: string;
  text: string;
}

function NavItem({ href, text }: NavItemProps) {
  return (
    <a
      className="flex items-center px-3 py-2 text-xl font-bold leading-snug text-black hover:opacity-75"
      href={href}
    >
      <div className="align-self-middle right-0 my-auto mr-0 align-middle text-black">
        {text}
      </div>
    </a>
  );
}
export default NavItem;
