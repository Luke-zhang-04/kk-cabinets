"use strict";function _createForOfIteratorHelper(o,allowArrayLike){var it;if(typeof Symbol==="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function(){};return{s:F,n:function n(){if(i>=o.length)return{done:!0};return{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var normalCompletion=!0,didErr=!1,err;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();normalCompletion=step.done;return step},e:function e(_e2){didErr=!0;err=_e2},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]()}finally{if(didErr)throw err}}}}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i]}return arr2}var data=new Map;var columnNum=0;var columns=$("#row").find(".responsive_column");var imgURL;var storageRef=storage.ref("countertops");function contains(target,array){var _iterator=_createForOfIteratorHelper(array),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){i=_step.value;if(target===i){return!0}}}catch(err){_iterator.e(err)}finally{_iterator.f()}return!1}function arrayRemove(arr,value){return arr.filter(function(ele){return ele!==value})}db.collection("countertops").get().then(function(snapshot){snapshot.docs.forEach(function(doc){data[doc.id]=doc.data()});display_batch(data)});function display_batch(data){var _loop=function(key){imgURL=storageRef.child(data[key]["file"]);var column=columns[columnNum%4];var id=key;imgURL.getDownloadURL().then(function(url){$(column).append("<div class=\"image_container\" id="+id+"><img onclick=\"expand("+id+")\"src=\""+url+"\"/></div>");var element=$("#"+id);element.append("<div class=\"details\"><p>"+data[id]["caption"]+"<p></div>")});columnNum++};for(var key in data){_loop(key)}$("#loading").css("display","none")}function expand(key){var element=document.getElementById(key);var container=element.getElementsByClassName("details")[0];if(container.style.maxHeight){container.style.maxHeight=null}else{container.style.maxHeight=container.scrollHeight+"px"}}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL2NvdW50ZXJ0b3BzLmpzIl0sIm5hbWVzIjpbImRhdGEiLCJNYXAiLCJjb2x1bW5OdW0iLCJjb2x1bW5zIiwiJCIsImZpbmQiLCJpbWdVUkwiLCJzdG9yYWdlUmVmIiwic3RvcmFnZSIsInJlZiIsImNvbnRhaW5zIiwidGFyZ2V0IiwiYXJyYXkiLCJpIiwiYXJyYXlSZW1vdmUiLCJhcnIiLCJ2YWx1ZSIsImZpbHRlciIsImVsZSIsImRiIiwiY29sbGVjdGlvbiIsImdldCIsInRoZW4iLCJzbmFwc2hvdCIsImRvY3MiLCJmb3JFYWNoIiwiZG9jIiwiaWQiLCJkaXNwbGF5X2JhdGNoIiwia2V5IiwiY2hpbGQiLCJjb2x1bW4iLCJnZXREb3dubG9hZFVSTCIsInVybCIsImFwcGVuZCIsImVsZW1lbnQiLCJjc3MiLCJleHBhbmQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInN0eWxlIiwibWF4SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0Il0sIm1hcHBpbmdzIjoiZzJDQXFCQSxHQUFJQSxDQUFBQSxJQUFJLENBQUcsR0FBSUMsQ0FBQUEsR0FBZixDQUNBLEdBQUlDLENBQUFBLFNBQVMsQ0FBRyxDQUFoQixDQUNBLEdBQUlDLENBQUFBLE9BQU8sQ0FBR0MsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxJQUFWLENBQWUsb0JBQWYsQ0FBZCxDQUNBLEdBQUlDLENBQUFBLE1BQUosQ0FDQSxHQUFJQyxDQUFBQSxVQUFVLENBQUdDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosQ0FBakIsQ0FHQSxRQUFTQyxDQUFBQSxRQUFULENBQWtCQyxNQUFsQixDQUEwQkMsS0FBMUIsQ0FBaUMsMENBQ25CQSxLQURtQixZQUM3QiwrQ0FBaUIsQ0FBWkMsQ0FBWSxhQUNiLEdBQUlGLE1BQU0sR0FBS0UsQ0FBZixDQUFrQixDQUNkLFFBQ0gsQ0FDSixDQUw0QixtREFNN0IsUUFDSCxDQUdELFFBQVNDLENBQUFBLFdBQVQsQ0FBcUJDLEdBQXJCLENBQTBCQyxLQUExQixDQUFpQyxDQUM3QixNQUFPRCxDQUFBQSxHQUFHLENBQUNFLE1BQUosQ0FBVyxTQUFTQyxHQUFULENBQWEsQ0FDM0IsTUFBT0EsQ0FBQUEsR0FBRyxHQUFLRixLQUNsQixDQUZNLENBR1YsQ0FHREcsRUFBRSxDQUFDQyxVQUFILENBQWMsYUFBZCxFQUE2QkMsR0FBN0IsR0FBbUNDLElBQW5DLENBQXdDLFNBQUNDLFFBQUQsQ0FBYyxDQUNsREEsUUFBUSxDQUFDQyxJQUFULENBQWNDLE9BQWQsQ0FBc0IsU0FBQUMsR0FBRyxDQUFJLENBQ3pCMUIsSUFBSSxDQUFDMEIsR0FBRyxDQUFDQyxFQUFMLENBQUosQ0FBZUQsR0FBRyxDQUFDMUIsSUFBSixFQUNsQixDQUZELEVBR0E0QixhQUFhLENBQUM1QixJQUFELENBQ2hCLENBTEQsRUFRQSxRQUFTNEIsQ0FBQUEsYUFBVCxDQUF1QjVCLElBQXZCLENBQTZCLG9CQUNoQjZCLEdBRGdCLEVBRXJCdkIsTUFBTSxDQUFHQyxVQUFVLENBQUN1QixLQUFYLENBQWlCOUIsSUFBSSxDQUFDNkIsR0FBRCxDQUFKLENBQVUsTUFBVixDQUFqQixDQUFULENBQ0EsR0FBSUUsQ0FBQUEsTUFBTSxDQUFHNUIsT0FBTyxDQUFDRCxTQUFTLENBQUMsQ0FBWCxDQUFwQixDQUNBLEdBQUl5QixDQUFBQSxFQUFFLENBQUdFLEdBQVQsQ0FDQXZCLE1BQU0sQ0FBQzBCLGNBQVAsR0FBd0JWLElBQXhCLENBQTZCLFNBQVNXLEdBQVQsQ0FBYyxDQUV2QzdCLENBQUMsQ0FBQzJCLE1BQUQsQ0FBRCxDQUFVRyxNQUFWLENBQ0kscUNBQXVDUCxFQUF2QyxDQUE0Qyx5QkFBNUMsQ0FBd0VBLEVBQXhFLENBQTZFLFdBQTdFLENBQTBGTSxHQUExRixDQUFnRyxZQURwRyxFQUtBLEdBQUlFLENBQUFBLE9BQU8sQ0FBRy9CLENBQUMsQ0FBQyxJQUFNdUIsRUFBUCxDQUFmLENBR0FRLE9BQU8sQ0FBQ0QsTUFBUixDQUNJLDZCQUErQmxDLElBQUksQ0FBQzJCLEVBQUQsQ0FBSixDQUFTLFNBQVQsQ0FBL0IsQ0FBcUQsV0FEekQsQ0FHSCxDQWJELEVBY0F6QixTQUFTLEVBbkJZLEVBQ3pCLElBQUssR0FBSTJCLENBQUFBLEdBQVQsR0FBZ0I3QixDQUFBQSxJQUFoQixDQUFzQixPQUFiNkIsR0FBYSxDQW1CckIsQ0FFRHpCLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBY2dDLEdBQWQsQ0FBa0IsU0FBbEIsQ0FBNkIsTUFBN0IsQ0FDSCxDQUdELFFBQVNDLENBQUFBLE1BQVQsQ0FBZ0JSLEdBQWhCLENBQXFCLENBQ2pCLEdBQUlNLENBQUFBLE9BQU8sQ0FBR0csUUFBUSxDQUFDQyxjQUFULENBQXdCVixHQUF4QixDQUFkLENBQ0EsR0FBSVcsQ0FBQUEsU0FBUyxDQUFHTCxPQUFPLENBQUNNLHNCQUFSLENBQStCLFNBQS9CLEVBQTBDLENBQTFDLENBQWhCLENBQ0EsR0FBSUQsU0FBUyxDQUFDRSxLQUFWLENBQWdCQyxTQUFwQixDQUE4QixDQUMxQkgsU0FBUyxDQUFDRSxLQUFWLENBQWdCQyxTQUFoQixDQUE0QixJQUMvQixDQUZELElBRU8sQ0FDSEgsU0FBUyxDQUFDRSxLQUFWLENBQWdCQyxTQUFoQixDQUE0QkgsU0FBUyxDQUFDSSxZQUFWLENBQXlCLElBQ3hELENBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuXHRLSyBDYWJpbmV0c1xuICAgIENvcHlyaWdodCAoQykgMjAyMCAgTHVrZSBaaGFuZywgRXRoYW4gTGltXG4gICAgXG4gICAgaHR0cHM6Ly9sdWtlLXpoYW5nLTA0LmdpdGh1Yi5pb1xuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhhbmxpbTA0XG5cbiAgICBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuXG4gICAgVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gICAgYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAgICBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gICAgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuICAgIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gICAgYWxvbmcgd2l0aCB0aGlzIHByb2dyYW0uICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4qL1xuXG5sZXQgZGF0YSA9IG5ldyBNYXBcbmxldCBjb2x1bW5OdW0gPSAwXG5sZXQgY29sdW1ucyA9ICQoXCIjcm93XCIpLmZpbmQoXCIucmVzcG9uc2l2ZV9jb2x1bW5cIilcbmxldCBpbWdVUkxcbmxldCBzdG9yYWdlUmVmID0gc3RvcmFnZS5yZWYoXCJjb3VudGVydG9wc1wiKVxuXG4vL2lmIGFycmF5IGNvbmFpbnMgdGFyZ2V0XG5mdW5jdGlvbiBjb250YWlucyh0YXJnZXQsIGFycmF5KSB7XG4gICAgZm9yIChpIG9mIGFycmF5KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IGkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG59XG5cbi8vcmVtb3ZlIGVsZW1lbnQgZnJvbSBhcnJheVxuZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyLCB2YWx1ZSkge1xuICAgIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uKGVsZSl7XG4gICAgICAgIHJldHVybiBlbGUgIT09IHZhbHVlXG4gICAgfSlcbn1cblxuLy9nZXQgY291bnRlcnRvcHMgZnJvbSBmaXJlc3RvcmVcbmRiLmNvbGxlY3Rpb24oXCJjb3VudGVydG9wc1wiKS5nZXQoKS50aGVuKChzbmFwc2hvdCkgPT4ge1xuICAgIHNuYXBzaG90LmRvY3MuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICBkYXRhW2RvYy5pZF0gPSBkb2MuZGF0YSgpXG4gICAgfSlcbiAgICBkaXNwbGF5X2JhdGNoKGRhdGEpXG59KVxuXG4vL2hhbmRsZSBkYXRhIGFuZCBkaXNwbGF5IGltYWdlcyBhY2NvcmRpbmdseVxuZnVuY3Rpb24gZGlzcGxheV9iYXRjaChkYXRhKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcbiAgICAgICAgaW1nVVJMID0gc3RvcmFnZVJlZi5jaGlsZChkYXRhW2tleV1bXCJmaWxlXCJdKSAvL2ltYWdlIHVybFxuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1uc1tjb2x1bW5OdW0lNF0gLy9jb2x1bW4gdG8gYXBwZW5kIGltYWdlIHRvXG4gICAgICAgIGxldCBpZCA9IGtleSAvL2ZvciBhc3luY2hyb251cyBnZXREb3dubG9hZFVSTFxuICAgICAgICBpbWdVUkwuZ2V0RG93bmxvYWRVUkwoKS50aGVuKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgLy9hcHBlbmQgaW1hZ2UgdG8gY29sdW1uXG4gICAgICAgICAgICAkKGNvbHVtbikuYXBwZW5kKCBcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9XFxcImltYWdlX2NvbnRhaW5lclxcXCIgaWQ9XCIgKyBpZCArIFwiPjxpbWcgb25jbGljaz1cXFwiZXhwYW5kKFwiICsgaWQgKyBcIilcXFwic3JjPVxcXCJcIisgdXJsICsgXCJcXFwiLz48L2Rpdj5cIlxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAvL2F0dGFjaCBpbmZvcm1hdGlvbiB0byBpbWFnZVxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKFwiI1wiICsgaWQpIC8vc2hvcnRjdXQgZm9yIHRhcmdldCBlbGVtZW50XG5cbiAgICAgICAgICAgIC8vYXBwZW5kIGluZm9ybWF0aW9uIHRvIGVsZW1lbnRcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKFxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwiZGV0YWlsc1xcXCI+PHA+XCIgKyBkYXRhW2lkXVtcImNhcHRpb25cIl0gKyBcIjxwPjwvZGl2PlwiXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICAgIGNvbHVtbk51bSsrXG4gICAgfVxuICAgIC8vcmVtb3ZlIGxvYWRpbmcgZ2lmXG4gICAgJChcIiNsb2FkaW5nXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpXG59XG5cbi8vbWFrZXMgaW5mb3JtYXRpb24gZHJvcCBkb3duXG5mdW5jdGlvbiBleHBhbmQoa2V5KSB7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXkpXG4gICAgbGV0IGNvbnRhaW5lciA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRldGFpbHNcIilbMF1cbiAgICBpZiAoY29udGFpbmVyLnN0eWxlLm1heEhlaWdodCl7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5tYXhIZWlnaHQgPSBjb250YWluZXIuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbn0iXX0=