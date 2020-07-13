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

npx babel ./js/ --out-dir ./docs/js --minified --compact true --no-comments -s inline

sass scss/:docs/css --style compressed

cd docs/js
for file in *; do
    if [[ -f "$file" ]]&&[[ "$file" != *".min.js"* ]];then
        echo "/**
 * KK Cabinets
 * @copyright (C) 2020 Luke Zhang, Ethan Lim
 * 
 * @author Luke Zhang, Ethan Lim
 * 
 * https://luke-zhang-04.github.io/
 * https://github.com/ethanlim04
 * 
 * @license GPL-3.0
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
$(cat $file)" > "$file"
    fi
done
cd ../..
