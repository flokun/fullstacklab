<?php


namespace App\Controller;


use App\Repository\BienImmobilierRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BienImmobilierController extends AbstractController
{
    const MIN_YEAR = 2015;
    const MAX_YEAR = 2019;

    /**
     * @var BienImmobilierRepository
     */
    private $bienImmobilierRepository;

    public function __construct(BienImmobilierRepository $bienImmobilierRepository)
    {
        $this->bienImmobilierRepository = $bienImmobilierRepository;
    }

    /**
     * Diagramme circulaire - Récupère le montant des répartitions des ventes par région en %
     * @Route(
     *     path="/bien_immobiliers/ventes_regions/{year}",
     *     name="ventes_regions",
     *     methods={"GET"},
     * )
     * @param Request $request
     * @param int $year
     * @return Response
     */
    public function getSalesByRegion(Request $request, int $year)
    {
        if ($year < self::MIN_YEAR || $year > self::MAX_YEAR) {
            return new JsonResponse("La date doit être comprise entre 2015 et 2019", 400);
        }

        $regions = [
            "Auvergnes-Rhônes-Alpes" => [
                "dept" => [69, 1, 3, 7, 15, 26, 38, 42, 43, 63, 74, 73]
            ],
            "Bourgogne-Franche-Compté" => [
                "dept" => [21, 25, 39, 58, 70, 71, 89, 90]
            ],
            "Bretagne" => [
                "dept" => [22, 29, 35, 56]
            ],
            "Centre-Val de Loire" => [
                "dept" => [18, 28, 36, 37, 41, 45]
            ],
            "Grand Est" => [
                "dept" => [8, 10, 51, 52, 54, 55, 57, 67, 68, 88]
            ],
            "Hauts-de-France" => [
                "dept" => [2, 59, 60, 62, 80]
            ],
            "Île-de-France" => [
                "dept" => [77, 78, 91, 92, 93, 94, 75, 95]
            ],
            "Normandie" => [
                "dept" => [14, 27, 50, 61, 76]
            ],
            "Nouvelle-Aquitaine" => [
                "dept" => [16, 17, 19, 23, 24, 33, 40, 47, 64, 79, 86, 87]
            ],
            "Occitanie" => [
                "dept" => [9, 11, 12, 30, 31, 32, 34, 46, 48, 65, 66, 81, 82]
            ],
            "Pays de la Loire" => [
                "dept" => [44, 49, 53, 72, 85]
            ],
            "Provences-Alpes-Côte d'Azur" => [
                "dept" => [04, 05, 06, 13, 83, 84]
            ],
            "Guadeloupe" => [
                "dept" => [971]
            ],
            "Martinique" => [
                "dept" => [972]
            ],
            "Guyane" => [
                "dept" => [973]
            ],
            "La Réunion" => [
                "dept" => [974]
            ],
            "Mayotte" => [
                "dept" => [976]
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
            $bienImmobiliersSortedByRegion[$key] = round(($venteRegion / $totalVentes) * 100, 2);
        }

        return new JsonResponse($bienImmobiliersSortedByRegion, 200);
    }

    //TODO: autres routes pour les autres diagrammes
}
