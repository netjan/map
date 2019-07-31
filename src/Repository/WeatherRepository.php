<?php

namespace App\Repository;

use App\Entity\Weather;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\ORM\Tools\Pagination\Paginator;

// use JMS\Serializer\SerializerBuilder;

/**
 * @method Weather|null find($id, $lockMode = null, $lockVersion = null)
 * @method Weather|null findOneBy(array $criteria, array $orderBy = null)
 * @method Weather[]    findAll()
 * @method Weather[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WeatherRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Weather::class);
    }

    // /**
    //  * @return Weather[] Returns an array of Weather objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Weather
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function findPaginated($page, $rows)
    {
        $qb = $this->createQueryBuilder('w')
        ->setFirstResult(($page - 1) * $rows)
        ->setMaxResults($rows)
        ->getQuery();

        // $encoders = [new JsonEncoder()];
        // $normalizers = [new ObjectNormalizer()];

        // $serializer = new Serializer($normalizers, $encoders);

        $paginator = new Paginator($qb, true);
        return $paginator;

        $data = [
            'count' => $paginator->count(),
            'itemsPerPage' => $rows,
            'page' => $page,
            'pageCount' => ceil($paginator->count() / $rows),
            'items' => $this->prepereItem($paginator),
        ];

        // print_r($data);

        // $data->items = $this->{$prepareGridRowsMethod}($pagination);

        return $data;
    }
    public function prepereItem(Paginator $pagination)
    {
        $out = array();
        // $serializer = SerializerBuilder::create()->build();
        foreach ($pagination as $k => $item) {
            // print_r($item);
            // $out[$item->getId()] = json_decode($serializer->serialize($item, 'json'));
            // $out[$item->getId()] = $item;
        }
        return $out;
    }
}
