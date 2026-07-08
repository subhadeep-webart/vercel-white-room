const AudioPlayerWrapper = () => {
  return (
    <div className="w-full max-w-xl mx-auto p-4 rounded-md shadow-md">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          trackUrl
        )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
        className="rounded-md"
      ></iframe>
    </div>
  );
};

export default AudioPlayerWrapper;
