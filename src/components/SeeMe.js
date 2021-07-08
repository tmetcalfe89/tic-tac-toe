import "./seeme.css";

const host = window.location.host;

const subdomain = host.split(".")[1] ? host.split(".")[0] : "";

export default function SeeMe({ location }) {
  const getGitHubLink = () => {
    return `https://github.com/${subdomain}${location.pathname}`;
  };

  return (
    <div className="seeme">
      <a href={getGitHubLink()}>Come check me out on GitHub!</a>
    </div>
  );
}
