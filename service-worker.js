/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/app.css","bca178ba5bd6b70a41f4bc568eb03272"],["/data/pets.json","1d0f9a68066e3cc9febc64745c64d993"],["/data/products.json","b85e73c46714f83dcbcbfe7d415194e8"],["/data/wness.json","323ec13747d4157af5a398ef0854125e"],["/images/icons/android-icon-144x144.png","f04cd209bf91ce38a0851763ce28476b"],["/images/icons/android-icon-192x192.png","876c53f306d1936dc69cbc1170279b2b"],["/images/icons/android-icon-36x36.png","14e03e4a66deb8b807077bd05e593038"],["/images/icons/android-icon-48x48.png","b1984b7d0368c08a07bd6249dcbc137b"],["/images/icons/android-icon-72x72.png","71b5618ac0c3493f9963a33c10dc73ec"],["/images/icons/android-icon-96x96.png","7bcfbf56c549a5ab2f52cca1463ce46f"],["/images/icons/apple-icon-114x114.png","f24d48c52d6e5826213e05a48154ac4e"],["/images/icons/apple-icon-120x120.png","028ac01810aa22fab303fa53ead41bcd"],["/images/icons/apple-icon-144x144.png","f04cd209bf91ce38a0851763ce28476b"],["/images/icons/apple-icon-152x152.png","05c93405bf0e8720cf1c87fe072280be"],["/images/icons/apple-icon-180x180.png","24d1643dc29c42394a22d55b42751028"],["/images/icons/apple-icon-57x57.png","0ba5536a5ac49f0b549737eceb890265"],["/images/icons/apple-icon-60x60.png","2fa14206f78ce45c86b3648c9ccbcff6"],["/images/icons/apple-icon-72x72.png","71b5618ac0c3493f9963a33c10dc73ec"],["/images/icons/apple-icon-76x76.png","9e06004e33f4f5707993a260785e27ed"],["/images/icons/apple-icon-precomposed.png","17fe137e65c82934d3801f8814c69acf"],["/images/icons/apple-icon.png","17fe137e65c82934d3801f8814c69acf"],["/images/icons/favicon-16x16.png","420e790fa7be573c8fdfaab6c5dea59e"],["/images/icons/favicon-32x32.png","97348a9272f10b0e4bfa4ff77134b587"],["/images/icons/favicon-96x96.png","7bcfbf56c549a5ab2f52cca1463ce46f"],["/images/icons/icon_reload.svg","f335e79828d92afbb64be2863f53372a"],["/images/icons/manifest.json","b58fcfa7628c9205cb11a1b2c3e8f99a"],["/images/icons/ms-icon-144x144.png","f04cd209bf91ce38a0851763ce28476b"],["/images/icons/ms-icon-150x150.png","b46d8729978ee314156595ecbe631384"],["/images/icons/ms-icon-310x310.png","d567c136f24159efc906331421bf72fd"],["/images/icons/ms-icon-70x70.png","59572ff0e738c6a337d2000e2d1c0eeb"],["/images/products/st1.jpg","e61a69f80fd5c383fccea3ce68a5cdbc"],["/images/products/st1_sq.jpg","1a6f88d4729ed115a2145eb232d12943"],["/images/products/st2.jpg","dcfb1f5fe0bdcb56ce914a9efe25d6ca"],["/images/products/st2_sq.jpg","1213cc9fe7c4af788d3b6bfe7f08cfd6"],["/images/products/st3_sq.jpg","116d4d422718ffc8894e053ccd9e4658"],["/images/products/w1.jpg","357643616fa2e8ee92fa8832dceb8c9e"],["/images/products/w10.jpg","326d322cceb6e9dac6cd97d840dc9a04"],["/images/products/w10_sq.jpg","61ef63bd165b10974115911ed7f7ef75"],["/images/products/w11.jpg","287a3159be7c1134c824b33c13b01165"],["/images/products/w11_sq.jpg","10ee2e61df19ac225fe1d0c8f9cdbf3e"],["/images/products/w12.jpg","d6ef38a1b3abdfe008ddd4db2839a66b"],["/images/products/w12_sq.jpg","d344d3077b72afb7700b3e99f3762cc9"],["/images/products/w13.jpg","e492ddc3fd201648a764031e799b10dc"],["/images/products/w13_sq.jpg","6d745beadffe16ef4649454f816eca51"],["/images/products/w14.jpg","c432c88d7a1122dbf9b84e8931429d70"],["/images/products/w14_sq.jpg","5bcc3748f3d45804f40ecb7f4e61b8b5"],["/images/products/w15.jpg","b747771e2851c97d448adbf5f4f7f70f"],["/images/products/w15_sq.jpg","a875516540bf24c1499af5c5db7d48ba"],["/images/products/w1_sq.jpg","42ff39a15003c6656d93a7a17b3fbea4"],["/images/products/w2.jpg","739d7447eab867477990c06d921e8563"],["/images/products/w2_sq.jpg","347e6382a346fe197763203f4603f044"],["/images/products/w3.jpg","d5ff5c286155817fcd7a6238ef878ff2"],["/images/products/w3_sq.jpg","4f6270d1bd5a7f0e09a12a79f7f03924"],["/images/products/w4.jpg","2a35373991f10bf102cd6df71fbed9ec"],["/images/products/w4_sq.jpg","77c5ad6bbd5c11635a940617e42ce4d3"],["/images/products/w5.jpg","4964784768e75ab6e61c09df9691be2b"],["/images/products/w5_sq.jpg","7deb8cb3d200285750de29b1ba57ff61"],["/images/products/w6.jpg","a2fcc2435611c65f7d5dfefa963b49ba"],["/images/products/w6_sq.jpg","8086b954b044792541eb749418cb36bf"],["/images/products/w7.jpg","4412f672c2bcb108674fec33c09b7414"],["/images/products/w7_sq.jpg","59770a214bba2ae9979d37e48da16e1f"],["/images/products/w8.jpg","57d955268fe43794c57b27e75d909849"],["/images/products/w8_sq.jpg","7d7bb8f123c7049942825a9074bb66fa"],["/images/products/w9.jpg","f7fbc1080c8c9cc8eb4093879271e735"],["/images/products/w9_sq.jpg","0070d858577dcd5e8d72aee8d9810551"],["/images/wisdompetlogo.svg","39f38bb326a1129cdd0d109192520159"],["/index.html","a1fb6e9e8d69d792f8c81af5f8da2e65"],["/js/app.js","81d1ce40389dc5fc6b84476ef057228a"],["/manifest.json","68c856295b5990fc6ff11cb9fc281d4c"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







