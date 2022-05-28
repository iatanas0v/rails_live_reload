module RailsLiveReload
  module Rails
    class Middleware
      def initialize(app)
        @app = app
      end

      def call(env)
        dup.call!(env)
      end

      def call!(env)
        request = Rack::Request.new(env)

        if env["REQUEST_PATH"] == "/xxx"

          [
            200,
            { 'Content-Type' => 'application/json' },
            [ RailsLiveReload::Command.new(request.params).command.to_json ]
          ]

        else
          @status, @headers, @response = @app.call(env)

          # binding.pry

          if @response.respond_to?(:[]) && (@status == 500 || (@status.to_s =~ /20./ && request.get?))
            new_response = make_new_response(@response[0])
            @headers['Content-Length'] = new_response.bytesize.to_s
            @response = [new_response]
          end

          # binding.pry

          [@status, @headers, @response]
        end
      end

      private

      def make_new_response(body)
        body.sub("</head>", "</head>#{RailsLiveReload::Helper.rails_live_reload}")
      end

    end
  end
end