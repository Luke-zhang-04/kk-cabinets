#!/bin/bash
# KK Cabinets
# Copyright (C) 2020  Luke Zhang, Ethan Lim
#
# https://luke-zhang-04.github.io
# https://github.com/ethanlim04
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

bin="./node_modules/.bin"

build() {
    echo "Compiling with tsc"
    "$bin"/tsc &

    echo "Compiling with sass"
    "$bin"/sass scss/:build/css --style compressed --no-source-map &

    wait

    echo "Bundling with Rollup"
    "$bin"/rollup -c rollup.config.js

    echo "Minifying with Babel"
    "$bin"/babel build/js/*.js -d build/js --no-babelrc --config-file ./.babelrc.min.js

    echo "Moving assets"
    cp -rv public/pictures build

    echo "Minifying with html-minifer"
    for file in public/*.html; do
        "$bin"/html-minifier  --collapse-whitespace --remove-comments "$file" -o build/"$(basename "$file")" &
    done
}

buildDev() {
    if [[ $(echo "scss:$(tar cf - scss | shasum -a 384)" | node buildInfo.js) == 1 ]]; then
        # Compile SASS
        echo -e "Compiling ./scss/ to ./public/css/ with sass"
        "$bin"/sass scss/:public/css &
    else
        echo -e "No changed found in ./scss/"
    fi

    sourceDidChange=$(echo "src:$(tar cf - src | shasum -a 384)" | node buildInfo.js)

    if [[ $sourceDidChange == 1 ]]; then
        # Compile w/ TypeScript
        echo -e "Compiling ./src/ to ./lib/ with TypeScript"
        "$bin"/tsc

        echo -e "Bundling with rollup"
        NODE_ENV="dev" "$bin"/rollup -c rollup.config.js
    else
        echo -e "No changed found in ./src/"
    fi
}

if [[ $1 == "-d" ]]||[[ $1 == "--dev" ]]; then
    buildDev
else
    build
fi
