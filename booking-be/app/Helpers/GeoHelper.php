<?php
namespace App\Helpers;

class GeoHelper
{
    public static function getLatLngFromAddress($address)
    {
        $url = config('services.opencage.url') . '?' . http_build_query([
            'q' => $address,
            'key' => config('services.opencage.key'),
            'language' => config('services.opencage.language', 'en'),
            'countrycode' => config('services.opencage.country', 'vn'),
            'limit' => config('services.opencage.limit', 1)
        ]);

        $response = file_get_contents($url);
        $json = json_decode($response, true);

        if (!empty($json['results'][0])) {
            return [
                'lat' => $json['results'][0]['geometry']['lat'],
                'lng' => $json['results'][0]['geometry']['lng'],
            ];
        }

        return null;
    }
}
