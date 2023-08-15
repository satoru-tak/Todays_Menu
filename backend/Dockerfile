FROM ruby:3.0.4

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo

RUN apt-get update -qq \
  && apt-get install -y nodejs postgresql-client npm \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && npm install --global yarn

WORKDIR /api
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock

RUN gem update --system \
  && gem install bundler
RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

COPY . /api

# vimをインストール（不要なインストールもあるかも・・・？）
RUN apt-get update \
  && apt-get install apt-file -y \
  && apt-file update \
  && apt-get install vim -y

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]