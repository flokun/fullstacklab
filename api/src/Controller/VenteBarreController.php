<?php


namespace App\Controller;


use App\Repository\BienImmobilierRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class VenteBarreController
{

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

    public function __invoke(Request $data, string $period_type, string $start_date, string $end_date)
    {
        $computedData = [];
        $ecart = strtotime($end_date) - strtotime($start_date);
        $nb_ecart = 0;
        $ecart_type = '';

        switch ($period_type) {
            case  'month':
                $nb_ecart = round($ecart / (60 * 60 * 24 * 31)) - 1;
                $ecart_type = 'month';
                break;
            case  'week':
                $nb_ecart = round(round($ecart / (60 * 60 * 24)) / 7);
                $ecart_type = 'day';
                break;
            case  'day':
                $nb_ecart = round($ecart / (60 * 60 * 24));
                $ecart_type = 'day';
                break;
        }

        for ($i = 0; $i <= $nb_ecart; $i++) {
            $sd = date("Y-m-d", strtotime("+" . ($period_type === 'week' ? $i * 7 : $i) . " " . $ecart_type, strtotime($start_date)));
            $ed = date("Y-m-d", strtotime("+" . ($period_type === 'week' ? ($i + 1) * 7 : ($i + 1)) . " " . $ecart_type, strtotime($start_date)));

            if ($i === $nb_ecart) {
                $ed = $end_date;
            }

            $computedData[] = [
                'periode' => $sd . ' au ' . $ed,
                'nb_ventes' => $this->bienImmobilierRepository->getSalesByPeriod($sd, $ed)[0][1]
            ];
        }

        return new JsonResponse($computedData, 200);
    }
}
