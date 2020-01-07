<?php


namespace App\Controller;


use App\Repository\BienImmobilierRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PrixSurfaceController
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

    public function __invoke(Request $data)
    {
        //Récupère les prix des bien
        $prixMoy = [];
        $cpt = 0;

        $PrixBien= $this->bienImmobilierRepository->getPriceByMonthYear();
        for($i = 0; $i<count($PrixBien); $i+=2){
            $prixMoy[$cpt] = [];
            $prixMoy[$cpt]["time"] = $PrixBien[$i]["date"];
            $prixMoy[$cpt]["Maison"] = ($PrixBien[$i]["sum"] / $PrixBien[$i]["count"])/1000;
            $prixMoy[$cpt]["Appartement"] = ($PrixBien[$i+1]["sum"] / $PrixBien[$i+1]["count"])/1000;
            $cpt++;
        }

        return new JsonResponse($prixMoy, 200);
    }
}
