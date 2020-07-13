/**
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
"use strict";$(document).ready(function(){$(".card").on("click",function(event){if(this.hash!==""&&this.hash){event.preventDefault();var hash=this.hash;$("html, body").animate({scrollTop:$(hash).offset().top},800,function(){window.location.hash=hash})}})});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL2Fib3V0LmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJldmVudCIsImhhc2giLCJwcmV2ZW50RGVmYXVsdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJ3aW5kb3ciLCJsb2NhdGlvbiJdLCJtYXBwaW5ncyI6ImFBcUJBQSxDQUFDLENBQUNDLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFVBQVUsQ0FFeEJGLENBQUMsQ0FBQyxPQUFELENBQUQsQ0FBV0csRUFBWCxDQUFjLE9BQWQsQ0FBdUIsU0FBU0MsS0FBVCxDQUFnQixDQUdyQyxHQUFJLEtBQUtDLElBQUwsR0FBYyxFQUFkLEVBQW9CLEtBQUtBLElBQTdCLENBQW1DLENBRTdCRCxLQUFLLENBQUNFLGNBQU4sR0FHQSxHQUFJRCxDQUFBQSxJQUFJLENBQUcsS0FBS0EsSUFBaEIsQ0FJQUwsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQk8sT0FBaEIsQ0FBd0IsQ0FDcEJDLFNBQVMsQ0FBRVIsQ0FBQyxDQUFDSyxJQUFELENBQUQsQ0FBUUksTUFBUixHQUFpQkMsR0FEUixDQUF4QixDQUVHLEdBRkgsQ0FFUSxVQUFVLENBR2RDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQlAsSUFBaEIsQ0FBdUJBLElBQzFCLENBTkQsQ0FPSCxDQUNKLENBcEJELENBcUJILENBdkJEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBLSyBDYWJpbmV0c1xuICogQ29weXJpZ2h0IChDKSAyMDIwICBMdWtlIFpoYW5nLCBFdGhhbiBMaW1cbiAqIEBhdXRob3IgbHVrZSB6aGFuZywgZXRoYW5cbiAqIFxuICogaHR0cHM6Ly9sdWtlLXpoYW5nLTA0LmdpdGh1Yi5pb1xuICogaHR0cHM6Ly9naXRodWIuY29tL2V0aGFubGltMDRcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKiBcbiAqIFRoaXMgcHJvZ3JhbSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKiBcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgIC8vIEFkZCBzbW9vdGggc2Nyb2xsaW5nIHRvIGFsbCBsaW5rc1xuICAgICQoXCIuY2FyZFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIFxuICAgICAgLy8gTWFrZSBzdXJlIHRoaXMuaGFzaCBoYXMgYSB2YWx1ZSBiZWZvcmUgb3ZlcnJpZGluZyBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICBpZiAodGhpcy5oYXNoICE9PSBcIlwiICYmIHRoaXMuaGFzaCkge1xuICAgICAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0IGFuY2hvciBjbGljayBiZWhhdmlvclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBcbiAgICAgICAgICAgIC8vIFN0b3JlIGhhc2hcbiAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5oYXNoXG4gIFxuICAgICAgICAgICAgLy8gVXNpbmcgalF1ZXJ5XCJzIGFuaW1hdGUoKSBtZXRob2QgdG8gYWRkIHNtb290aCBwYWdlIHNjcm9sbFxuICAgICAgICAgICAgLy8gVGhlIG9wdGlvbmFsIG51bWJlciAoODAwKSBzcGVjaWZpZXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdGFrZXMgdG8gc2Nyb2xsIHRvIHRoZSBzcGVjaWZpZWQgYXJlYVxuICAgICAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKGhhc2gpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgfSwgODAwLCBmdW5jdGlvbigpe1xuICAgICBcbiAgICAgICAgICAgICAgICAvLyBBZGQgaGFzaCAoIykgdG8gVVJMIHdoZW4gZG9uZSBzY3JvbGxpbmcgKGRlZmF1bHQgY2xpY2sgYmVoYXZpb3IpXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IC8vIEVuZCBpZlxuICAgIH0pXG59KSJdfQ==
