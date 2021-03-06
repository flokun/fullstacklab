<?php


namespace App\Controller;


use App\Repository\BienImmobilierRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class RegionController
{
    const MIN_YEAR = 2015;
    const MAX_YEAR = 2019;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var BienImmobilierRepository
     */
    private $bienImmobilierRepository;

    public function __construct(EntityManagerInterface $manager, BienImmobilierRepository $bienImmobilierRepository)
    {
        $this->entityManager = $manager;
        $this->bienImmobilierRepository = $bienImmobilierRepository;
    }

    public function __invoke(Request $data, int $year)
    {
        if ($year < self::MIN_YEAR || $year > self::MAX_YEAR) {
            return new JsonResponse("La date doit être comprise entre 2015 et 2019", 400);
        }

        $regions = [
            "Auvergnes-Rhônes-Alpes" => [
                "dept" => [69, 1, 3, 7, 15, 26, 38, 42, 43, 63, 74, 73],
                'color' => 'blue',
            ],
            "Bourgogne-Franche-Compté" => [
                "dept" => [21, 25, 39, 58, 70, 71, 89, 90],
                'color' => 'yellow',
            ],
            "Bretagne" => [
                "dept" => [22, 29, 35, 56],
                'color' => 'orange',
            ],
            "Centre-Val de Loire" => [
                "dept" => [18, 28, 36, 37, 41, 45],
                'color' => 'green',
            ],
            "Grand Est" => [
                "dept" => [8, 10, 51, 52, 54, 55, 57, 67, 68, 88],
                'color' => 'pink',
            ],
            "Hauts-de-France" => [
                "dept" => [2, 59, 60, 62, 80],
                'color' => 'gray',
            ],
            "Île-de-France" => [
                "dept" => [77, 78, 91, 92, 93, 94, 75, 95],
                'color' => 'purple',
            ],
            "Normandie" => [
                "dept" => [14, 27, 50, 61, 76],
                'color' => '#9966ff',
            ],
            "Nouvelle-Aquitaine" => [
                "dept" => [16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87],
                'color' => '#7733ff',
            ],
            "Occitanie" => [
                "dept" => [9, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82],
                'color' => '#66a33ff',
            ],
            "Pays de la Loire" => [
                "dept" => [44, 49, 53, 72, 85],
                'color' => 'black',
            ],
            "Provences-Alpes-Côte d'Azur" => [
                "dept" => [04, 05, 06, 13, 83, 84],
                'color' => 'brown',
            ],
            "Guadeloupe" => [
                "dept" => [971],
                'color' => '#d966ff',
            ],
            "Martinique" => [
                "dept" => [972],
                'color' => '#333300',
            ],
            "Guyane" => [
                "dept" => [973],
                'color' => '#003366',
            ],
            "La Réunion" => [
                "dept" => [974],
                'color' => '#800000',
            ],
            "Mayotte" => [
                "dept" => [976],
                'color' => '#00ff00',
            ]
        ];

        //Récupère les biens vendus par département
        $bienImmobiliersSortedByDepartment = $this->bienImmobilierRepository->getSalesByDepartment($year);

        //Tri des biens par région via les départements
        $bienImmobiliersSortedByRegion = [];

        foreach ($bienImmobiliersSortedByDepartment as $bien) {
            foreach ($regions as $key => $region) {
                if (in_array($bien['codeDepartement'], $region['dept'])) {
                    if (key_exists($key, $bienImmobiliersSortedByRegion)) {
                        $bienImmobiliersSortedByRegion[$key] += $bien['nombre_ventes'];
                    } else {
                        $bienImmobiliersSortedByRegion[$key] = $bien['nombre_ventes'];
                    }
                }
            }
        }

        $totalVentes = array_sum($bienImmobiliersSortedByRegion);

        //Calcul du pourcentage
        foreach ($bienImmobiliersSortedByRegion as $key => $venteRegion) {
            $bienImmobiliersSortedByRegion[$key] = [];
            $bienImmobiliersSortedByRegion[$key]['value'] = round(($venteRegion / $totalVentes) * 100, 2);
            $bienImmobiliersSortedByRegion[$key]['color'] = $regions[$key]['color'];
        }

        return new JsonResponse($bienImmobiliersSortedByRegion, 200);
    }
}
