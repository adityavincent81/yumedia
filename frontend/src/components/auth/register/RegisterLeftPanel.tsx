export default function RegisterLeftPanel() {
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

      {/* Main Heading */}
      <div className="space-y-4">
        <h1
          className="
            text-5xl
            font-bold
            leading-tight
          "
        >
          Join the
          <br />
          campus
          <span className="block bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
            ecosystem
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
          Connect with students,
          share ideas, collaborate
          on projects, and stay
          updated with everything
          happening on campus.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid gap-4">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            backdrop-blur-sm
          "
        >
          <h3 className="font-semibold">
            Student Network
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Discover and connect
            with students across
            faculties and batches.
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            backdrop-blur-sm
          "
        >
          <h3 className="font-semibold">
            Campus Community
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Join discussions,
            events, organizations,
            and academic activities.
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            backdrop-blur-sm
          "
        >
          <h3 className="font-semibold">
            Real-Time Interaction
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Chat, comment, and
            engage instantly with
            the campus community.
          </p>
        </div>
      </div>
    </div>
  );
}