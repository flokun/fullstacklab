<?php

namespace App\Repository;

use App\Entity\BienImmobilier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method BienImmobilier|null find($id, $lockMode = null, $lockVersion = null)
 * @method BienImmobilier|null findOneBy(array $criteria, array $orderBy = null)
 * @method BienImmobilier[]    findAll()
 * @method BienImmobilier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BienImmobilierRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BienImmobilier::class);
    }

    public function getSalesByDepartment(int $year) {
        try {
            $from = new \DateTime($year . '-01-01 00:00:00');
            $to = new \DateTime($year . '-12-31 23:59:59');

            $query = $this->createQueryBuilder('b')
                ->select('b.codeDepartement, count(b.codeDepartement) AS nombre_ventes')
                ->andWhere('b.dateMutation BETWEEN :from AND :to')
                ->setParameter('from', $from)
                ->setParameter('to', $to)
                ->groupBy('b.codeDepartement');

            $result = $query->getQuery()->getResult();


            return $result;
        } catch (\Exception $e) {
            dd($e);
        }
    }
}
