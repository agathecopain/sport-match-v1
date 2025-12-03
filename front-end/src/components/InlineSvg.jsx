import { useEffect, useState } from "react";

export default function InlineSVG({ url }) {
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => setSvg(text));
  }, [url]);

  return <span dangerouslySetInnerHTML={{ __html: svg }} />;
}
