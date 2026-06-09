/* eslint-disable react/no-unescaped-entities */
export default function LoginRightPanel() {
  return (
    <div className="space-y-8 text-white">
      {/* Logo */}
      <div className="inline-flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-cyan-500
            to-orange-500
            font-bold
            text-white
          "
        >
          Y
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Yumedia
          </h2>

          <p className="text-sm text-gray-400">
            Campus Social Platform
          </p>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-4">
        <h1
          className="
            text-5xl
            font-bold
            leading-tight
          "
        >
          Welcome
          <br />
          back to
          <span className="block bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
            Yumedia
          </span>
        </h1>

        <p
          className="
            max-w-lg
            text-lg
            leading-relaxed
            text-gray-400
          "
        >
          Stay connected with your
          classmates, organizations,
          campus events, and academic
          communities in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
            backdrop-blur-sm
          "
        >
          <p className="text-2xl font-bold">
            24/7
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Active Community
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
            backdrop-blur-sm
          "
        >
          <p className="text-2xl font-bold">
            Real-Time
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Interaction
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
            backdrop-blur-sm
          "
        >
          <p className="text-2xl font-bold">
            Secure
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Campus Network
          </p>
        </div>
      </div>

      {/* Quote */}
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-5
          backdrop-blur-sm
        "
      >
        <p className="text-gray-300 italic">
          "A place where students can
          connect, collaborate, and
          grow together beyond the
          classroom."
        </p>
      </div>
    </div>
  );
}