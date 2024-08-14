const _d = document;

export function crearSection(){
  const _section = _d.createElement("section");
  _section.classList.add(
    "fixed",
    "m-auto",
    "flex",
    "w-full",
    "min-h-screen",
    "justify-center",
    "p-5",
    "gap-5",
    "flex-wrap",
    "content-center",
    "bg-mdaBlack_400",
    "z-10"
  );
  return _section;
}

export function crearArticle() {
  const _article = _d.createElement("article");
  _article.classList.add(
    "bg-white",
    "w-full",
    "max-w-md",
    "shadow-md",
    "rounded-lg",
    "p-5",
    "flex",
    "flex-col",
    "justify-between",
    "gap-5"
  );
  return _article;
}

export function crearArticleDos() {
  const _article = _d.createElement("article");
  _article.classList.add(
    "bg-white",
    "w-full",
    "max-w-2xl",
    "shadow-md",
    "rounded-lg",
    "p-5",
    "flex",
    "flex-col",
    "justify-between",
    "gap-5"
  );
  return _article;
}

export function crearArticleNormal(){
  const _article = _d.getElementById("article");
  return _article;
}
