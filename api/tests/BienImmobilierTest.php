<?php


namespace App\Tests;


use App\Entity\BienImmobilier;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class BienImmobilierTest extends KernelTestCase
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * {@inheritDoc}
     */
    protected function setUp(): void
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    public function testGetAllBienImmobilier() {
        $biensImmobilier = $this->entityManager->getRepository(BienImmobilier::class)->findAll();
        $this->assertGreaterThan(1, $biensImmobilier);
    }
}
